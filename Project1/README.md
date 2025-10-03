1. Create a **VPC**
   - An AWS VPC is the base that your network is built on. It is essentially a divison of the region you choose to make your network in, except you control its settings rather than AWS.
![AWS VPC](/images/Project1/AWSVPC.png)
2. Create a **Subnet**
   - Subnets in AWS work the exact same as they do in physical networks. In AWS, subnets attached to the same VPC can talk to each other directly. A subnet is a reserved set of addresses for use in a network. Generally used for organizational or security purposes.
![AWS Subnet](/images/Project1/subnet.png)
3. Create an **Internet Gateway**
   - Internet gateways expose your AWS networks to the internet. They are the internet source part of the network.
![AWS Internate Gateway](/images/Project1/awsgw.png)
4. Create a **Route Table**
   - Routing tables route specified traffic to specified addresses based on a set of rules called "routes".
![AWS Route Table](/images/Project1/awsrt.png)
5. Create a **Security Group**
   - Security groups are essentially firewalls for your AWS network. They contain a list of rules to enable/disable certain traffic. By default they allow all traffic in or out.
![AWS Security Group](/images/Project1/awssg.png)
6. Modify or create a **Network ACL**
   - Network ACLs function as a firewall for a specific subnet.      
![AWS Network ACL](/images/Project1/awssg.png)
7. Identify OR create a **Key Pair**
   - Key pairs are used to securely connect to a device. The private key is encrypted and stored on the server/instance, while the public key is distributed to those who need to connect. For this AWS setup, I will be generating a keypair named ceg3120.
8. Reserve an **Elastic IP address**. 
   - In AWS, an elastic IP is an assigned IP you use to ssh into your instances. It will always remain the same. The public IP can change due to the shear amount of connections AWS uses. The elastic IP is basically an alias IP to allow you to always connect to the "same" IP.
## Part 2 - EC2 Instance Creation

1. Create a new **Instance**. In addition to describing what an instance is and how-to launch a new one, find and document the following information about the instance you have built:
   - Description: An instance is essentially a virtual machine that AWS hosts on their servers. It can use any image that you provide. For this example, I will be building a basic Ubuntu instance.
   - AMI selected:  Ubuntu 24.04 LTS ID = `ami-0360c520857e3138f`
   - default username of the instance type selected:  Ubuntu
   - instance type selected:  t3.small 
   - keypair selected: ceg3120
   - describe why you need to select a keypair:  Without a keypair assigned to the instance, you will be unable to ssh into the instance.

###How to launch an AWS instance
     1. Under EC2 Console, Click `Luanch Instance`
     2. Select image (AMI)
     3. Configure network settings. The instance will by default select the amazon default VPC.
     4. After selecting the desired VPC, you may select your subnet and security group.
     5. At the bottom of the setup page, select your volume type and size. The storage will automatically be attached to the instance on creation.
     6. The instance can be tagged by selecting the instance name > tags > Manage tags.

2. Associate the Elastic IP with your instance.
In EC2 management: select Elastic IP's > Select your elastic IP > Actions > Associate Elastic IP Address. Under the Associate Elastic IP Address menu, select the instance you want to associate to the elastic IP and the private IP address you would like associated to the instance.

3. AWS Instance Screenshot. 
![AWS Instance](/images/Project1/instance.png)

## Part 3 - Instance Configuration

This part will focus on configurations and tests once you `ssh` in to your instance.

For each step below, provide a description of steps to complete the tasks and any additional documentation required by the step.

1. `ssh` in to your instance.
    `ssh -i /path/to/key/file "HOSTNAME"@"ELASTIC_IP"` 
2. Change the hostname to "YOURLASTNAME-AMI" where YOURLASTNAME is your last name and where AMI is some identifier of the AMI you chose. 
   - All that needs done is to change /etc/hostname with sudo privleges. Use your preferred text editor. After file has been saved, reboot the instance.
3. Create a **screenshot of your `ssh` connection to your instance** and add it to your project write up - make sure it shows your new hostname in the CLI prompt.
![AWS Instance w/ hostname change](/images/Project1/hostname.png)
4. Prove with trial descriptions & screenshots that your Network ACL and Security Group are allowing or blocking traffic per your configurations.
As seen in the above screenshot, the instance as able to install `neofetch` which means that the instance can contact ubuntu update servers.

The following screenshot will show how the instance can not contact `wttr.in`
![AWS Instance not talking](/images/Project1/wttr.png)
5. Install `docker` per instructions for the AMI you chose.
Go to docker documentation and install using docker's apt repository
```
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```
Lastly, verify installation by running `sudo docker run hello-world`
