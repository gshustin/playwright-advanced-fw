pipeline {
  agent any
  tools {
    nodejs 'Node18'
    jdk 'temurin-17'
  }
  environment {
    CI = 'true'                // глобально говорим: это CI → teardown пропустит allure generate
    ALLURE_GENERATE = 'false'  // можно поставить 'true', если когда-то захочешь генерить в CI
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
          npx playwright test --output=playwright-report
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