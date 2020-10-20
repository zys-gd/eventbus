#!/bin/bash

mysql -uroot -p${MYSQL_ROOT_PASSWORD} -e "ALTER USER '${MYSQL_USER}'@'%' IDENTIFIED WITH mysql_native_password BY '${MYSQL_PASSWORD}';" >/dev/null 2>/dev/null
mysql -uroot -p${MYSQL_ROOT_PASSWORD} -e "ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '${MYSQL_ROOT_PASSWORD}';" >/dev/null 2>/dev/null

mysql -uroot -p${MYSQL_ROOT_PASSWORD} -e "FLUSH PRIVILEGES;" >/dev/null 2>/dev/null

