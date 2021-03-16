import request from './request';

// const server = 'http://mykefeng.run4wd.com';
const server = 'https://mykefeng.yutai365.com';
const apiUrl=  server + '/test';

const qs = {
    stringify: function (data) {
        let str = '';
        Object.keys(data).forEach((key, index) => {
            str += `${index != 0 ? '&' : ''}${key}=${data[key]}`
        })
        return str;
    }
}
const post = function (url, data, method) {
    return request(server + url, data, method || 'POST');
}
const get = function (url, data, method) {
    return post(url, data, 'GET');
}
const queryData = function (data) {
    return request(apiUrl, data, 'POST')
}
const queryMySchoolBanner = function (data) {
    return post('/myschool/queryMySchoolBanner', data)
}
const queryMySchoolCourse = function (data) {
    return post('/myschool/queryMySchoolCourse', data)
}
const queryMySchoolCourseById = function (data) {
    return post('/myschool/queryMySchoolCourseById', data)
}
const queryMySchoolTutor = function (data) {
    return post('/myschool/queryMySchoolTutorById', data)
}
const queryCommentByCId = function (data) {
    return post('/myschool/queryMySchoolUserCourseByCourseId', data)
}
const sendCode = function (data) {
    return post(`/mySchoolSendVerificationCode?loginName=${data.loginName}`, data)
}
const login = function (data) {
    return post('/mySchoolLogin', data);
}
const checkCode = function (data) {
    return post(`/mySchoolCheckVerificationCode?${qs.stringify(data)}`)
}
const authGetUserInfo = function (data) {
    return post('/getAuthorization', data)
}
const addComment = function (data) {
    return post('/myschool/addMySchoolUserCourse', data)
}
const attentionTeacher = function (data) {
    return post('/myschool/addMySchoolTutorAttentioned', data)
}
const cancelAttention = function (data) {
    return post('/myschool/cancelFollowingTutor', data)
}
const queryAttentionList = function (data) {
    return post('/myschool/queryMySchoolTutorAttentionedByUserId', data)
}
const addLike = function (data) {
    return post('/myschool/addMySchoolUserLike', data);
}
const cancelLike = function (data) {
    return get(`/wx/myschool/delMySchoolUserLike/${data.cuswebuserid}/${data.userCourseId}`, data);
}
const queryLike = function (data) {
    return get(`/myschool/queryUserLikeByUserIdAndCourseId/${data.cuswebuserid}/${data.courseId}`, data);
}
const addGradeOne = function (data) {
    return post('/myschool/addUserIntegralOne', data);
}
const finishViewVideo = function (data) {
    return post('/myschool/saveMySchoolUserVideoHistory', data);
}
export default {
    finishViewVideo,
    addGradeOne,
    addLike,
    cancelLike,
    queryLike,
    queryAttentionList,
    attentionTeacher,
    cancelAttention,
    addComment,
    sendCode,
    login,
    checkCode,
    authGetUserInfo,
    queryData,
    queryMySchoolBanner,
    queryMySchoolCourse,
    queryMySchoolCourseById,
    queryMySchoolTutor,
    queryCommentByCId
}