## Project 2

### Description
This YAML creates a Ubuntu instance that hosts 2 websites. One on port 80, and one on port 8080. These are demo websites with one being titled "AWS Cloud Cuties" and the other "AWS VPC Quick Reference Sheet". These are purely for testing purposes to test running bash scripts within the instance as specified in the CF template.

#### Notes for self
Don't use tabs, the fingers will thank you but AWS will not. Also using something other than vim will probably help maintain sanity a bit better.

### Diagram
![CF Diagram](/images/Project2/CF.png)

#### Explanation
During the creation of the stack, the first componenets that must be generated are the NACL rules and the Elastic IP for the public facing ubuntu instance. Without these, AWS is unable to create the stack as described in the template. All of this is managed under the VPC and its rules, hence the outlining of the entire diagram. All traffic from the networkACl and the Ubuntu instance are subject to rules contained within the security group. The Ubuntu instance hosts two main services: Docker and an Apache2 service. The Docker container uses apache to host the two websites that are detailed in the CF template.
