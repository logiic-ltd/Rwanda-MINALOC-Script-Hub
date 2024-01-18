# Rwanda MINALOC DHIS2 Digital Toolkit

## Overview
This repository is a comprehensive collection of scripts aimed at aiding the installation, configuration, and maintenance of DHIS2 instances for Rwanda's Ministry of Local Government (MINALOC). It includes a variety of utility scripts ranging from system setup to data processing.

## Contents
- `install_dhis2.sh` - A script for installing DHIS2, including necessary dependencies like OpenJDK and Tomcat.
- `configure_dhis2.sh` - A configuration script for setting up DHIS2 with database connections and encryption settings.
- `setup.sh` - A basic server setup script including timezone configuration, PostgreSQL and PostGIS installation, and user creation.
- Additional utility scripts for data processing and management in Google Sheets, Python, and more.

## Getting Started
To use these scripts:
1. Clone the repository or download the required script directly.
2. Modify the script parameters as needed, particularly for credentials and paths.
3. Execute the script on your server or in your local environment, following any specific instructions in the script comments.

## Scripts Overview

### install_dhis2.sh
Automates the installation process of DHIS2. It includes the installation of OpenJDK 11 and Tomcat, and sets up a Tomcat instance for DHIS2. The script also handles the download and deployment of the DHIS2 WAR file.

### configure_dhis2.sh
Creates the necessary DHIS2 configuration, including database connections and encryption settings. Essential for the initial setup of DHIS2.

### setup.sh
Prepares a server for DHIS2 installation. This includes setting the server timezone, installing PostgreSQL and PostGIS, and configuring the database.

## Contributing
Contributions to this repository are welcomed. Please ensure your code adheres to standard coding conventions and is well-documented.

## License
[Specify the License here]

## Contact
For inquiries or contributions, please contact [Your Contact Information].
