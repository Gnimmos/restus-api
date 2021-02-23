
declare @fromdate datetime
declare @todate datetime
declare @idterminal varchar(100)
declare @iduser varchar(100)
declare @iddepartment integer
declare @idtype varchar(100)






-- get employees
select User_ID,User_FirstName+' '+User_LastName from access_user where (User_ID > '0000' and User_ID <= '9999') order by User_FirstName+' '+User_LastName