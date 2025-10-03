## Part 1 - Build a VPC

For each step below, provide 
   - a description of what the resource does (what is its role).
   - responses to additional requests for information in any step.
   - a screenshot that shows the resource has been created according to specification  
   
You may add whatever additional notes you would like. Getting a good screenshot can be done by clicking on the resource and showing configurations in the details menu.

1. Create a **VPC**
   - Tag the "Name" with "YOURLASTNAME-VPC"
   - Specify a CIDR block of `192.168.0.0/23`
2. Create a **Subnet**
   - Tag the "Name" with "YOURLASTNAME-Subnet"
   - Reserve `192.168.0.0 - 192.168.0.255` for use on this subnet
   - Attach it to your VPC
   - Document the reserved block for the subnet **and** the remaining block(s) available in VPC
3. Create an **Internet Gateway**
   - Tag the "Name" with "YOURLASTNAME-gw"
   - Attach it to your VPC
4. Create a **Route Table**
   - Tag the "Name" with "YOURLASTNAME-rt"
   - Attach it to your VPC
   - Associate it with your subnet
   - Add a routing table rule that sends traffic to destinations external to your subnet CIDR block to your internet gateway
5. Create a **Security Group**
   - Tag the "Name" with "YOURLASTNAME-sg"
   - Allow SSH for a set of trusted source networks including:
     - Your home / where you usually connect to your instances from
     - Wright State (addresses in CIDR block 130.108.0.0/16)
     - Instances within the VPC
   - Attach it to your VPC
   - Make sure screenshot includes content of the Inbound rules
6. Modify or create a **Network ACL**
   - Tag the "Name" with "YOURLASTNAME-nacl"
   - Affirm association or associate resource with the subnet
   - Verify that for Inbound & Outbound there is a rule that `Allow`s any IP (v4 only is sufficient) on all ports
     - If this rule does not exist, you'll need to create it.  Created Network ACL's are `Deny` all traffic on all ports, Inbound and Outbound, by default.
   - Deny outbound connections to any port on [wttr.in](https://wttr.in/)
7. Identify OR create a **Key Pair**
   - Document how the public and private keys of a key pair are stored.
8. Reserve an **Elastic IP address**. 
   - Tag the "Name" with "YOURLASTNAME-EIP". 
   - Document the difference between an Elastic IP and a Public IP.

## Part 2 - EC2 Instance Creation

This part will focus on configuring an instance in your VPC.

For each step below, provide a description of steps to complete the tasks (screenshots not required) and any additional documentation required by the step.

Note: these steps are ordered based on the "Launch Instances" wizard.

1. Create a new **Instance**. In addition to describing what an instance is and how-to launch a new one, find and document the following information about the instance you have built:
   - AMI selected - AMI id & OS with version
   - default username of the instance type selected
   - instance type selected 
   - keypair selected
   - describe why you need to select a keypair
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
