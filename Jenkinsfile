pipeline {
    agent any
  stages {
    stage ('image build and Push') {
      steps {
        sh '''
            ls
            docker rm $(docker images ls -q)
            docker rm -f $(docker ps)
            systemctl status docker
            docker build -t sampleapp:1 .
            docker run -d -p 3000:3000 sampleapp:1
        '''
      }
    }
  }
}
