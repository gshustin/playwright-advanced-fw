pipeline {
  agent any
  tools {
    nodejs 'Node18'
    jdk 'temurin-17'     // ← обязательно: имя из Manage Jenkins → Tools
  }
  options { timestamps(); ansiColor('xterm') }

  stages {
    stage('Checkout') { steps { checkout scm } }

    // чтобы явно увидеть, что Java есть
    stage('Java check') { steps { sh 'java -version || true' } }

    stage('Install dependencies') {
      steps {
        sh '''
          npm ci
          npx playwright install
        '''
      }
    }

    stage('Run tests') {
      steps {
        // пишем JUnit в файл + сохраняем allure-results; html-репорт остаётся как есть
        sh '''
          mkdir -p junit
          npx playwright test \
            --reporter=junit \
            --reporter-option outputFile=junit/results.xml \
            --reporter=allure-playwright \
            --output=playwright-report
        '''
      }
      post {
        always {
          junit testResults: 'junit/results.xml', allowEmptyResults: false
          archiveArtifacts artifacts: 'junit/*.xml, allure-results/**, playwright-report/**', allowEmptyArchive: true
        }
      }
    }

    stage('Allure Report') {
      when { expression { fileExists('allure-results') } }
      steps {
        allure(
          jdk: 'temurin-17',
          results: [[path: 'allure-results']],
          reportBuildPolicy: 'ALWAYS'
        )
      }
    }
  }
}