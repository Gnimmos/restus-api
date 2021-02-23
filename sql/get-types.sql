



declare @fromdate datetime
declare @todate datetime
declare @idterminal varchar(100)
declare @iduser varchar(100)
declare @iddepartment integer
declare @idtype varchar(100)


--get types
select distinct User_CardSN from access_user order by User_CardSN
