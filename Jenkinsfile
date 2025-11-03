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
          # Гарантированно положим JUnit в файл, независимо от config.ts
          mkdir -p test-results
          PLAYWRIGHT_JUNIT_OUTPUT_NAME=results.xml \
          npx playwright test --reporter=junit,allure-playwright --output=playwright-report

          echo "== ls test-results ==" && ls -lah test-results || true
          echo "== ls allure-results ==" && ls -lah allure-results || true
        '''
      }
      post {
        always {
          // Берём JUnit там, где Playwright его создаёт по умолчанию с env-переменной
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