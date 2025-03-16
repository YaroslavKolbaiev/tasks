enum RequireId {
    ID_REQUIRED = 'Id is required',
    INVALID_ID = 'Invalid id was provided'
}

enum ValidateRequest {
    TITLE_REQUIRED = 'Title is required',
    INVALID_DESCRIPTION = 'Invalid description provided',
    INVALID_PARENT_TASK_ID = 'Invalid parentTaskId provided',
    INVALID_STATUS = 'Invalid status provided'
}

export { RequireId, ValidateRequest };