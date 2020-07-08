const validateTutorCardForm = values => {
    const errors = {};
    if (values.major.length > 50) {
        errors.major = 'Must be 50 characters or less';
    }

    if (values.skills.length > 200) {
        errors.skills = 'Must be 200 characters or less';
    }

    if (values.timeAvailability.length > 100) {
        errors.timeAvailability = 'Must be 100 characters or less';
    }

    if (values.preferredSoftware.length > 20) {
        errors.preferredSoftware = 'Must be 20 characters or less';
    }

    if (values.details.length > 200) {
        errors.details = 'Must be 200 characters or less';
    }

    return errors;
};

export const validateTutorPostPageOneForm = values => {
    const errors = {};
    if (values.title.length > 30) {
        errors.title = 'Must be 30 characters or less';
    }

    if (values.description.length > 200) {
        errors.description = 'Must be 200 characters or less';
    }

    return errors;
};
export default validateTutorCardForm