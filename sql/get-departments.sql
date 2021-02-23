



declare @fromdate datetime
declare @todate datetime
declare @idterminal varchar(100)
declare @iduser varchar(100)
declare @iddepartment integer
declare @idtype varchar(100)

-- get departments
select DepartmentID,DepartmentName from access_department order by DepartmentName