#!/bin/bash

##############################################################################
#
#		Verify the user is logged into NPM.
#
#		Useful when publishing to NPM.
#
##############################################################################

npm whoami &> /dev/null
if [[ $? -ne 0 ]]; then 
  printf "❌ Failed: Please login to NPM before publishing.\n\n"; 
  exit 1; 
fi
