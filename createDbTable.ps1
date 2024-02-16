$PSDefaultParameterValues['Out-File:Encoding'] = 'utf8'

Get-Content -Path .env | ForEach-Object {
    if ($_ -eq '') {
    }
    else {
        $name, $value = $_.split('=')
        set-content env:$name $value
    }
    
}

$prm = "& mysql.exe -h '$env:DB_HOST' -P $env:DB_PORT -u '$env:DB_USERNAME' -p$env:DB_PASS --default-character-set=utf8"

$env:DB_DATABASE_NAME = $env:DB_DATABASE_NAME.Replace("'" , '')

$create_data_base = $prm + ' -e "CREATE DATABASE ' + $env:DB_DATABASE_NAME + ' CHARACTER SET utf8"'
Invoke-Expression $create_data_base

$create_data_table_3 = $prm + ' -D ' + $env:DB_DATABASE_NAME + ' -e "
CREATE TABLE ds_lop (
    id VARCHAR(7) PRIMARY KEY,
    display_name VARCHAR(80) CHARACTER SET utf8
)"'
Invoke-Expression $create_data_table_3

$create_data_table_4 = $prm + ' -D ' + $env:DB_DATABASE_NAME + ' -e "
CREATE TABLE ds_khoa (
    id VARCHAR(4) PRIMARY KEY,
    display_name VARCHAR(41) CHARACTER SET utf8
)"'
Invoke-Expression $create_data_table_4

$create_data_table_1 = $prm + ' -D ' + $env:DB_DATABASE_NAME + ' -e "
CREATE TABLE user_login_info (
    username VARCHAR(20) PRIMARY KEY,
    pass CHAR(40) NOT NULL,
    email VARCHAR(320) UNIQUE,
    id VARCHAR(36) NOT NULL UNIQUE,
    created DATE NOT NULL,
    token VARCHAR(36),
    type_signup VARCHAR(10) DEFAULT(''DEFAULT'')
)"'
Invoke-Expression $create_data_table_1

$create_data_table_2 = $prm + ' -D ' + $env:DB_DATABASE_NAME + ' -e "
CREATE TABLE user_info (
    id VARCHAR(36) PRIMARY KEY,
    display_name VARCHAR(40) CHARACTER SET utf8,
    ma_sv VARCHAR(11),
    khoa VARCHAR(4),
    lop VARCHAR(7),
    username VARCHAR(20),
    FOREIGN KEY(khoa) REFERENCES ds_khoa(id),
    FOREIGN KEY(lop) REFERENCES ds_lop(id),
    FOREIGN KEY(username) REFERENCES user_login_info(username) ON DELETE CASCADE
)"'
Invoke-Expression $create_data_table_2

$create_data_table_5 = $prm + ' -D ' + $env:DB_DATABASE_NAME + ' -e "
ALTER TABLE user_login_info ADD 
FOREIGN KEY(id)
REFERENCES user_info(id)
ON DELETE CASCADE"'
Invoke-Expression $create_data_table_5



# duml valuse

$ds_khoa = Get-Content .\db\query\ds_khoa.sql
$ds_lop = Get-Content .\db\query\ds_lop.sql


$inser1 = $prm + ' -D ' + $env:DB_DATABASE_NAME + ' -e "' + $ds_khoa + '"'
Invoke-Expression $inser1

$inser2 = $prm + ' -D ' + $env:DB_DATABASE_NAME + ' -e "' + $ds_lop + '"'
Invoke-Expression $inser2

