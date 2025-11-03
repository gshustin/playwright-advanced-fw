pipeline {
  agent any
  tools { nodejs 'Node18' }  
  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }
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
        sh 'npx playwright test --reporter=junit --output=playwright-report'
      }
      post {
        always {
          junit testResults: 'playwright-report/*.xml', allowEmptyResults: true
        }
      }
    }
  }
}