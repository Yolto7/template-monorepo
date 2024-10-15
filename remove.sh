#!/bin/bash

# Function to display help
usage() {
  echo "Usage: $0 -p package -s stage [-r region]"
  echo "  -p package  Specify the package to remove."
  echo "  -s stage    Specify the stage (dev or prod)."
  echo "  -r region   Specify the AWS region (default: us-east-1)."
  exit 1
}

# Predetermined values
REGION="us-east-1"

# Parse arguments
while getopts ":p:s:r:" opt; do
  case ${opt} in
    p)
      PACKAGE=$OPTARG
      ;;
    s)
      STAGE=$OPTARG
      if [[ "$STAGE" != "dev" && "$STAGE" != "prod" ]]; then
        echo "Error: Stage must be 'dev' or 'prod'."
        usage
      fi
      ;;
    r)
      REGION=$OPTARG
      ;;
    \?)
      echo "Invalid option: -$OPTARG" >&2
      usage
      ;;
    :)
      echo "Option -$OPTARG requires an argument." >&2
      usage
      ;;
  esac
done

# Verify that the required arguments have been provided
if [ -z "$PACKAGE" ] || [ -z "$STAGE" ]; then
  echo "Error: Package and stage are required."
  usage
fi

# Pre remove
cd packages/$PACKAGE

# Remove
if sls remove --stage $STAGE --region $REGION ; then
  echo "$(date '+%d/%m/%Y %H:%M:%S') The $PACKAGE package removed was successfully."
else
  echo "$(date '+%d/%m/%Y %H:%M:%S') The $PACKAGE package removed was failed."
fi
