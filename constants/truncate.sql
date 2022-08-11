-- Flush all document and it's detail

TRUNCATE table delete_logs ;
TRUNCATE table document_access_users;
TRUNCATE table  document_audits ;
TRUNCATE table hourly_accesses ;
TRUNCATE table document_checkouts ;
TRUNCATE table  documents ;
TRUNCATE table  attachments ;
TRUNCATE table  document_index_values ;
TRUNCATE table document_access_users ;
TRUNCATE table document_audits ;
TRUNCATE table document_checkouts;
TRUNCATE table  favourites ;
TRUNCATE table  logs;
TRUNCATE table  approval_masters;
TRUNCATE table  approval_queues;
TRUNCATE table  hourly_accesses;
TRUNCATE table  hourly_access_multiples;



TRUNCATE table logs



update documents set branchId =42 , hierarchy='Branch_42', securityLevel =NULL ,sendToChecker =0
where id is not null


