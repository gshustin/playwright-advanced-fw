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
        sh 'npx playwright test --output=playwright-report'
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