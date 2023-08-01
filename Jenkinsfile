pipeline {
    agent any
  stages {
    stage ('image build and Push') {
      steps {
        sh '''
            ls
             systemctl status docker
            docker rm -f $(docker images -a -q)
            docker rm -f $(docker ps -a -q)       
            docker build -t sampleapp:1 .
            docker run -d -p 3000:3000 sampleapp:1
        '''
      }
    }
    stage('backend image build and push') { 
      steps {
        sh'''
           ls
           cd server
           docker build -t backendsampleapp:1 .
           docker run -d -p 5000:5000 backendsampleapp:1
        ''' 
      }
    }
  }
}