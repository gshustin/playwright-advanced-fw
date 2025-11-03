pipeline {
  agent any
  tools {
    nodejs 'Node18'
    jdk 'temurin-17'
  }

  stages {
    stage('Checkout') { steps { checkout scm } }

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
        sh '''
          mkdir -p test-results
          # теперь явно указываем путь к JUnit файлу
          npx playwright test --reporter=junit --reporter=junit=./test-results/results.xml --reporter=allure-playwright --output=playwright-report

          echo "== test-results ==" && ls -lah test-results || true
        '''
      }
      post {
        always {
          junit testResults: 'test-results/results.xml', allowEmptyResults: false
          archiveArtifacts artifacts: 'test-results/results.xml, allure-results/**, playwright-report/**', allowEmptyArchive: true
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