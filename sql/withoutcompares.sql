



declare @fromdate datetime
declare @todate datetime
declare @idterminal varchar(100)
declare @iduser varchar(100)
declare @iddepartment integer
declare @idtype varchar(100)




set @fromdate='2018-01-01 03:00:00'
set @todate='2019-12-01 03:00:00'

set @idterminal='outlet comparing or remove comapare'
--user id to get ore remove compare
set @iduser='2'
--department to get or remove compares
set @iddepartment=1
--type to get or remove compare
set @idtype='1'




-- select without compares
select convert(datetime, convert(varchar(8),access_event_logs1.LOCAL_TIMESTAMP,112)) as systemdate, 
(case when ISNUMERIC(u.User_ID)=1 then CONVERT(int, u.User_ID) else 0 end) AS idEmployee, 
u.User_FirstName + ' ' + u.User_LastName  as employeeName, 
u.User_OtherName as payrollID, 
dep.DepartmentName , 
access_event_logs1.LOCAL_TIMESTAMP as login, 
access_event_logs2.LOCAL_TIMESTAMP as logout,  
convert(char(5), ((CASE WHEN access_event_logs2.LOCAL_TIMESTAMP < access_event_logs1.LOCAL_TIMESTAMP THEN DATEADD(DAY, 1, access_event_logs2.LOCAL_TIMESTAMP) ELSE access_event_logs2.LOCAL_TIMESTAMP END) - access_event_logs1.LOCAL_TIMESTAMP), 108) AS timeworked, 
convert(datetime, convert(varchar(8), access_event_logs1.LOCAL_TIMESTAMP, 112)) terminaldate, 
access_event_logs1.USERID,access_event_logs1.id,access_event_logs2.id, 
access_event_logs1.terminalsn, 
u.User_CardSN, 
sms.User_Hp, 
lo.Observation, 
lo2.Observation 
from access_user u 
LEFT JOIN access_event_logs access_event_logs1 ON access_event_logs1.USERID = u.User_ID 
LEFT JOIN access_event_logs access_event_logs2 ON access_event_logs2.USERID = access_event_logs1.USERID AND access_event_logs2.terminalsn = access_event_logs1.terminalsn AND access_event_logs2.ID = access_event_logs1.ID 
INNER JOIN access_user_dept deps ON deps.user_id= u.User_ID 
INNER JOIN access_user_smsemail sms ON sms.user_id= u.User_ID 
INNER JOIN access_department dep ON dep.departmentid=deps.dept_id 
left join LogObservation lo on lo.access_event_logsID=access_event_logs1.id 
left join LogObservation lo2 on lo2.access_event_logsID=access_event_logs2.id 
where  (access_event_logs1.LOCAL_TIMESTAMP IS NULL)  OR   ((access_event_logs1.LOCAL_TIMESTAMP >= @fromdate  AND access_event_logs1.LOCAL_TIMESTAMP < @todate)  AND (u.User_ID > '0000'  AND u.User_ID <= '9999')  )
ORDER by (case when ISNUMERIC(u.User_ID)=1 then CONVERT(int, u.User_ID) else 0 end), access_event_logs1.LOCAL_TIMESTAMP 