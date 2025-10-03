1. Create a **VPC**
![AWS VPC](images/Project1/AWSVPC.png)
2. Create a **Subnet**
   - Subnets in AWS work the exact same as they do in physical networks. In AWS, subnets attached to the same VPC can talk to each other directly. A subnet is a reserved set of addresses for use in a network. Generally used for organizational or security purposes.
![AWS Subnet](images/Project1/subnet.png)
3. Create an **Internet Gateway**
   - Internet gateways expose your AWS networks to the internet. They are the internet source part of the network.
![AWS Internate Gateway](images/Project1/awsgw.png)
4. Create a **Route Table**
   - Routing tables route specified traffic to specified addresses based on a set of rules called "routes".
![AWS Route Table](images/Project1/awsrt.png)
5. Create a **Security Group**
   - Security groups are essentially firewalls for your AWS network. They contain a list of rules to enable/disable certain traffic. By default they allow all traffic in or out.
![AWS Security Group](images/Project1/awssg.png)
6. Modify or create a **Network ACL**
   - Network ACLs function as a firewall for a specific subnet.      
![AWS Network ACL](images/Project1/awssg.png)
7. Identify OR create a **Key Pair**
   - Key pairs are used to securely connect to a device. The private key is encrypted and stored on the server/instance, while the public key is distributed to those who need to connect. For this AWS setup, I will be generating a keypair named ceg3120.
8. Reserve an **Elastic IP address**. 
   - In AWS, an elastic IP is an assigned IP you use to ssh into your instances. It will always remain the same. The public IP can change due to the shear amount of connections AWS uses. The elastic IP is basically an alias IP to allow you to always connect to the "same" IP.
## Part 2 - EC2 Instance Creation

This part will focus on configuring an instance in your VPC.

For each step below, provide a description of steps to complete the tasks (screenshots not required) and any additional documentation required by the step.

Note: these steps are ordered based on the "Launch Instances" wizard.

1. Create a new **Instance**. In addition to describing what an instance is and how-to launch a new one, find and document the following information about the instance you have built:
   - Description: An instance is essentially a virtual machine that AWS hosts on their servers. It can use any image that you provide. For this example, I will be building a basic Ubuntu instance.
   - AMI selected:  Ubuntu 24.04 LTS ID = `ami-0360c520857e3138f`
   - default username of the instance type selected:  Ubuntu
   - instance type selected:  t3.small 
   - keypair selected: ceg3120
   - describe why you need to select a keypair:  Without a keypair assigned to the instance, you will be unable to ssh into the instance.
   - the how-to launch an instance instructions should include coverage on how-to:
      - Attach the instance to your subnet within your VPC
      - Associate your security group, "YOURLASTNAME-sg" to your instance.
      - Attach a volume to your instance. 
      - Tag your instance with a "Name" of "YOURLASTNAME-instance". 
2. Associate the Elastic IP with your instance.
3. Create a **screenshot of your instance details** after instance has been launched and add it to your project write up. 

## Part 3 - Instance Configuration

This part will focus on configurations and tests once you `ssh` in to your instance.

For each step below, provide a description of steps to complete the tasks and any additional documentation required by the step.

1. `ssh` in to your instance. 
2. Change the hostname to "YOURLASTNAME-AMI" where YOURLASTNAME is your last name and where AMI is some identifier of the AMI you chose. 
   - Notes on changing a system hostname: 
      1. It is wise to copy config files you are about to change to filename.old For `/etc/hostname`, for example, I would first copy the current `hostname` file to `/etc/hostname.old`
      2. You should not change permissions on any files you are modifying. They are system config files. You may need to access them with administrative privileges.
      3. Here is a helpful resource: https://www.tecmint.com/set-hostname-permanently-in-linux/ I did not modify `/etc/hosts` on mine - do so or not as you wish.
3. Create a **screenshot of your `ssh` connection to your instance** and add it to your project write up - make sure it shows your new hostname in the CLI prompt.
4. Prove with trial descriptions & screenshots that your Network ACL and Security Group are allowing or blocking traffic per your configurations.
5. Install `docker` per instructions for the AMI you chose.
