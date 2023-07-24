pipeline {
    agent any
  stages {
    stage ('image build and Push') {
      steps {
        sh '''
            ls
            sudo systemctl start docker
            docker build -t sampleapp:1 .
            docker run -d -p 3000:3000 sampleapp:1
        '''
      }
    }
  }
}
 
