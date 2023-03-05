#!/bin/bash
if [ ! -f "db.json" ]; then
  echo '{
    "expenses": [], 
    "categories": []
  }' > db.json
fi