# Project Description
### Project Goal
The goal of this project is to create an AWS CF-template that deploys 1 proxy instance, and 3 host instances. The three hosts will be connected to the proxy instance to support a HAProxy load balancing configuration using the Round Robin algorithm.

### Resources
The AWS CF-template creates the following resources:
- 1 Proxy instance: This hosts the HAProxy service. The configuration for HAProxy is also in the CF-template to allow for easy, automatic deployment.
- 3 Host instances: These instances run a docker container with the website contents and httpd
- 1 VPC
- 2 Subnets: 1 private and 1 public subnet. The host instances are on the private subnet to prevent outside traffic directly interacting with the host instances and the proxy instance is on the public subnet so that it can take connections from the outside world.
- 1 Security Group: The security group has rules for local and outside http traffic, local and WSU ssh traffic, and local and outside https traffic.
- 1 Internet Gateway
- 1 NAT Gateway

#### Diagram
![CF Diagram](/images/Project3/awsdiagram.png)

# Building a web service container
### Explanation
The docker container is built upon the httpd image. It then serves the website using httpd. See ![DockerFile](/Project3/web-content/Dockerfile)
For Website contents, please see ![WebContent](/Project3/web-content)

### Instructions to build and push container image
After creating your dockerfile, create a docker image with `docker build -t image_name:tag .` while in the directory that contains the dockerfile. After the image has been created, push it to docker hub with the following:
```
docker tag mylocalimage myusername/myrepo:latest #tags image for upload
docker push myusername/myrepo:latest #push image to repo
```
#### Note:
You must first login to dockerhub from the terminal with `docker login --username YOUR_USERNAME`. When the terminal prompts you to enter your password, paste your Personal Access Token. Speaking of which, if you don't already have a PAT, you can generate one by logging into DockerHub on your browser, navigating to "Account Settings", "Personal Access Tokens", then click create. Set this to have a verbose name and set permissions for the token. It is general good practice to set an expiration date on the token so that you can securely rotate PAT's over time.


### Link to DockerHub repo
https://hub.docker.com/r/ozyozyozy/ceg3120project3

# Connections to instances within the VPC
### Purpose of configuring .ssh/config
In a real world scenario, having quick and easy access to all of the hosts is very important for both patching and general maintenance. All three hosts will need to be added to the proxy server's `.ssh/config`. For the CF-template included in this project, the ceg3120 key must be imported from a local machine using scp to the proxy server. Only then can the proxy server ssh into the host servers.

### How to ssh among the instances using `.ssh/config`
Each host will need an entry that looks like this:
```
Host "name of host"
    HostName "IP"
    User "User"
    Port 22
    IdentityFile /path/to/ssh/key
```
This will allow you to ssh into the host by just typing 'ssh "name of host"` making it much quicker to ssh into a host.

# Setting up the HAProxy load balancing instance
###Purpose and required location of HAProxy config
The HAProxy config file dictates how HAProxy runs and handles traffic.

### Link to HAProxy config
![HAProxy.cfg](/Project3/haproxy.cfg)

### Explanation of config
-Global: These are configuration rules that apply globally, meaning to the entirety of HAProxy. The settings that I have are for logging and session timeout lengths. This section also broadcasts a message to the proxy server when the hosts are unreachable.
-Frontend: This dictates what port the user facing portion of HAProxy is bound to. In my file, the frontend section is also where the mode is set, which in this case is http.
-Backend: This is where the names, ports, and addresses of the hosts are set. This section is also where you set your balancing algorithm
-listen stats: This section contains the contents and configuration for the stats page.

### How to test config without restarting HAProxy
`haproxy -c -f /etc/haproxy/haproxy.cfg` with test the configuration to ensure it is valid as according to the required syntax for HAProxy. For testing of actual configuration changes, such as changing the address of a host, you will need to either set up a separate test environment from production or restart the haproxy service to have the changes apply.

### Scenarios for control of HAProxy
HAProxy is primarily controlled with `systemctl`. HAProxy only needs restarted when changes are made to the config file. HAProxy will not automatically apply changes without a restart. The command to restart is `systemctl restart haproxy`. You will more than likely need sudo priveleges. To start or stop the HAProxy service, such as for maintenance, use `systemctl start/stop haproxy`.

# Proof of load balancer functionality
### Link to load balancer stats page
http://44.212.211.22:9000/stats

### Screenshots
![HAProxy.cfg](/images/Project3/haproxystats.png)
#### Description
As can be seen in the above screenshot, at the time of screenshot, each host has had a total of 5 sessions connecting, showing that as new sessions/visits occur, the algorithm is balancing the connections as according to the round robin algorithm.

![HAProxy.cfg](/images/Project3/haproxystats2.png)
#### Description
In this screenshot, there are multiple active sessions. You can see under Sessions/Total how sessions are rotating through the pool of hosts in alphaneumeric order (i.e host1 -> host2 -> host3).

 
# Citations
-Test website was generated with ChatGPT with the prompt "Can you generate me a sample website with two separate html files and a css file? This is just for testing a web server. It needs no specific themeing"
-Docker Docs for syntax of uploading images to docker hub. https://docs.docker.com/reference/cli/docker/image/push/
