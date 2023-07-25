pipeline {
    agent any
  stages {
    stage ('image build and Push') {
      steps {
        sh '''
            ls
            docker rm -f $(docker images ls -a -q)
            docker rm -f $(docker ps -a -q)
            systemctl status docker
            docker build -t sampleapp:1 .
            docker run -d -p 3000:3000 sampleapp:1
        '''
      }
    }
  }
}
