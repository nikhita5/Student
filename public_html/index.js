/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var jpdbBaseURL ="http://api.login2explore.com:5577";
var jpdbIRL = "/api/irl";
var jpdbIML = "/api/iml";
var empDBName = "Studevt";
var empRelationName ="STU-REL";
var connToken = "90932551|-31949277519332281|90949270";

function saveRecNo2LS(jsonObj){
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem("recno", lvData.rec_no);
    
}
function getRollnoAsJsonObj(){
    var Rollno = $("#Rollno").val();
    var jsonStr = {
        id: Rollno
    };
    return JSON.stringify(jsonStr);
}
function fillData(jsonObj){
    saveRecNo2LS(jsonObj);
    var record = JSON.parse(jsonObj.data).record;
    $("#Rollno").val(record.Rollno);
   $("#name").val(record.name);
   $("#class1").val(record.class);
   $("#DOB").val(record.DOB);
   $("#address").val(record.address); 
   $("#ED").val(record.ED)
}

 function resetForm() {
                $("#Rollno").val("")
                $("#name").val("");
                $("#class1").val("");
                $("#DOB").val("");
                $("#address").val("");
                $("#ED").val("");
                $("#Rollno").prop("disabled",false);
                $("#save").prop("disabled",true);
                $("#change").prop("disabled",true);
                $("#reset").prop("disabled",true);
                $("#Rollno").focus();
                
            }
 function validateData(){
                var Rollno, name, class1, DOB, ED, address;
                Rollno = $("Rollno").val();
                name = $("name").val();
                empsal = $("empsal").val();
                hra = $("hra").val();
                da = $("da").val();
                deduct = $("deduct").val();
                
                if(Rollno === ''){
                    alert("Student ID missing");
                    $("#Rollno").focus();
                    return "";
                }
                 if(name === ''){
                    alert("Student name missing");
                    $("#name").focus();
                    return "";
                }
                 if(class1 === ''){
                    alert("calss is  missing");
                    $("#empsal").focus();
                    return "";
                }
                 if(DOB === ''){
                    alert("DOB missing");
                    $("#hra").focus();
                    return "";
                }
                 if(ED === ''){
                    alert("ED missing");
                    $("#da").focus();
                    return "";
                }
                 if(address === ''){
                    alert("address missing");
                    $("#deduct").focus();
                    return "";
                }
                var jsonStrObj = {
                    id: Rollno,
                    name: name,
                    salary: empsal,
                    hra: hra,
                    da: da,
                    deduction: deduct
                };
                return JSON.stringify(jsonStrObj);
            }
            
 function getEmp(){
     var RollnoJsonObj = getStudentAsJsonObj();
     var getRequest = createGET_BY_EYRequest(connToken, StudentDBName, StudentRelationName, RollnoJsonObj);
     jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(putRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    if( resJsonObj.status === 400){
        $("#save").prop("disbaled", false);
        $("#reset").prop("disbaled", false);
        $("#empname").focus();
        
    }
    else if (resJsonObj.status === 200){
        $("#Rollno").prop("disbaled", true);
        fillData(resJsonObj);
        $("#change").prop("disbaled", false);
        $("#reset").prop("disbaled", false);
        $("#empname").focus();
    }
 } 
 
function saveData(){
    $("#save").prop("disbled", false);
    var jsonStrObj = validateData();{
    if(jsonStrObj === ""){
            return "";
    }
    var putRequest = createPUTRequest(connToken, jsonStrObj, StudentDBName, studentRelationName);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(putRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    resetForm();
    $('#empid').focus();
}
}

function changeData(){
    $("#change").prop("disbled", true);
    jsonchg = validatedata();
    var updateRequest = createUPDATERecordRequest(connToken, jsonchg, empDBName, empRelationName, localStorage.getItem());
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    console.log(resJsonObj);
    resetForm();
    $("#Rollno").focus();
    }
    