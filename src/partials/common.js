import { helpers } from 'vuelidate/lib/validators';

export const isFurigana = (value) => {
    let allow = true;
    let charArray = value.split('');
    for (let i=0; i<charArray.length; i++){
        let code = charArray[i].charCodeAt();        
        if (!(code > 12448 && code < 12543)) {            
            allow = false;
            break;           
        }
    }
    return !helpers.req(value) || allow;
}

export const matchYoutubeUrl = (value) => {
	if (!value) {
        return true;
	}
	let allow;
    let p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if (value.match(p)) {
        allow = value.match(p)[1];
    } else {
		allow = false;
	}	
	return !helpers.req(value) || allow;
}

export const showToggle = (index,old_index,status) => {
    let current = index;
	if(status == true) {
		if(current == old_index) status = false; 
	} else {
		status = true;
	}
    return !helpers.req(index) || status;
}

export const handleStatus = (targetClassName) => {
    // must be Class Names of changing status dropdown
    const statusToggleClasses = [
        'btn btn-common',
        'down-icon',
        'custom-radio-lable status-lable',
        'custion-radio'
    ];
    return statusToggleClasses.includes(targetClassName);
}

export const textEllipsis = (targetClassName) => {
    if(targetClassName == "txt-vertical-ellipsis") {
        targetClassName = "";
    } 
    else if(event.target.className == "") {
        targetClassName = "txt-vertical-ellipsis";
    }
    return targetClassName;
}

export const generateBill = (param) => {
    let invoice_form = {};
        invoice_form.id = param.id;
        invoice_form.title = param.title;
        invoice_form.management_number = param.management_number;
        invoice_form.recruiter_number = param.recruiter_number;
        invoice_form.recruiter_name = param.recruiter_name;
        invoice_form.email = param.recruiter_email;
        invoice_form.default_amount = 200000;
    return invoice_form;

}

export const closeInvoiceModal = () => {
    let invoice_form = {};
        invoice_form.id = 0;
        invoice_form.title =''
        invoice_form.management_number = '';
        invoice_form.recruiter_number = '';
        invoice_form.recruiter_name = '';
        invoice_form.email = '';
        invoice_form.tax = 200000;
        invoice_form.default_amount = 200000;
        invoice_form.default_amount = 220000;
        invoice_form.remark = '';
    return invoice_form;
}

// to show establish date, use this func which return establish date result
export const getEstablishDate = (est_date) => {
    let establishment_date  = '';
    let split_est_date      = est_date.split("-");
    // array cell[0] is for establishment_year & cell[1] is for establishment_month
    if (split_est_date[1] == '')
        establishment_date = split_est_date[0]+'年';
    else if(split_est_date[0] == '')
        establishment_date = split_est_date[1]+'月';
    else
        establishment_date = split_est_date[0]+'年 '+split_est_date[1]+'月';
    
    return establishment_date;
}