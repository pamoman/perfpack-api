/*
 * Lifecycle - Page
 */

const addLeadingSlash = (data) => {
    if (data.path !== "/" && !data.path.startsWith("/")) {
        data.path = "/" + data.path; 
    }
};

const removeTrailingSlash = (data) => {
    if (data.path !== "/" && data.path.endsWith("/")) {
        data.path = data.path.replace(/\/$/, ""); 
    }
};

module.exports = {
    beforeCreate(event) {
        const { params: { data } } = event;

        if (data?.path) {
            addLeadingSlash(data);
            removeTrailingSlash(data);
        }
    },
  
    beforeUpdate(event) {
        const { params: { data } } = event;

        if (data?.path) {
            addLeadingSlash(data);
            removeTrailingSlash(data);
        }
    },
};