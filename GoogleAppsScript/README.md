# Rwanda MINALOC DHIS2 Digital Toolkit

## Overview
This repository is a comprehensive collection of scripts designed to assist in the installation, configuration, and maintenance of DHIS2 instances for Rwanda's Ministry of Local Government (MINALOC). It includes various scripts, ranging from system setup to data processing, including utility scripts for Google Sheets and Python.

## Contents
- `identify_spaces_in_data_elements.gs` - Identifies data elements with spacing issues in DHIS2.
- `fix_spaces_in_data_elements.gs` - Corrects spacing in data element names in DHIS2.
- `compare_strings_fetch_dhis2_data.gs` - Compares strings in a Google Sheet with data elements in DHIS2 and fetches relevant data.
- Additional scripts for installation and configuration of DHIS2, and more.

## Getting Started
To use these Google Apps Scripts:
1. Open the Google Sheet where you want to run the script.
2. Go to `Extensions` > `Apps Script` and open the script editor.
3. Paste the script code into the editor.
4. Update any script parameters as required (like DHIS2 URL, credentials).
5. Run the script function from the script editor.

## Scripts Overview

### identify_spaces_in_data_elements.gs
Searches for and logs data elements in a DHIS2 dataset that contain unwanted spaces, such as extra or trailing spaces.

### fix_spaces_in_data_elements.gs
Automatically corrects the names of data elements in DHIS2 that have spacing issues, ensuring proper naming conventions are followed.

### compare_strings_fetch_dhis2_data.gs
Compares strings from a specified column in a Google Sheet against data elements in a DHIS2 dataset. It fetches data elements, performs comparisons, and logs the results.

## Contributing
Contributions to this repository are encouraged. Please ensure your code adheres to standard coding conventions and is well-documented.

## License
[Specify the License here]

## Contact
For inquiries or contributions, please contact [Your Contact Information].
