# Infrastructure as Code (IaC)

Infrastructure as Code (IaC) is the management of infrastructure (networks, virtual machines, load balancers, and connection topology) in a descriptive model, using the same versioning as DevOps team uses for source code. Like the principle that the same source code generates the same binary, an IaC model generates the same environment every time it is applied. IaC is a key DevOps practice and is used in conjunction with continuous delivery.

## The tools we have used 

- [Vagrant](https://www.vagrantup.com/)

    Vagrant is a tool for building and managing virtual machine environments in a single workflow. With an easy-to-use workflow and focus on automation, Vagrant lowers development environment setup time, increases production parity, and makes the "works on my machine" excuse a relic of the past.

- [Ansible](https://www.ansible.com/)

    Ansible is an open-source software provisioning, configuration management, and application-deployment tool enabling infrastructure as code. It runs on many Unix-like systems, and can configure both Unix-like systems as well as Microsoft Windows. It includes its own declarative language to describe system configuration.

- [VirtualBox](https://www.virtualbox.org/)

    Oracle VM VirtualBox is a free and open-source hosted hypervisor for x86 virtualization, developed by Oracle Corporation. Created by Innotek, it was acquired by Sun Microsystems in 2008, which was in turn acquired by Oracle in 2010.

## Other tools

- [Terraform](https://www.terraform.io/)

    Terraform is an open-source infrastructure as code software tool created by HashiCorp. Users define and provide data center infrastructure using a declarative configuration language known as HashiCorp Configuration Language (HCL), or optionally JSON.

## Files description

### Vagrantfile

This file is used to configure the virtual machine that will be created by Vagrant. It is written in Ruby and is used to configure the virtual machine's hostname, IP address, and other settings.

- Uses the `ubuntu/jammy64` box.
- Forwards port 3000 from the guest to the host.
- Syncs the `user_api` folder to `/home/vagrant/user_api` in the VM.
- Configures VM specs for both VirtualBox and VMware providers.
- Uses Ansible for provisioning with specific tags (`install`, `test`).
- Runs a shell provisioner to start the `npm` application inside the VM.

## Playbooks

### Install

This playbook is used to install necessary software on the VM.

- Updates the apt cache.
- Installs Node.js, npm, and Redis server.
- Installs Node packages for the `user_api` application.

### Test

This playbook is used to test the `user_api` application.

- Runs `npm test` to execute tests.
- Runs `npm run lint` to check for linting issues.