/*
 * Copyright (c) 2015 Memorial Sloan-Kettering Cancer Center.
 *
 * This library is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY, WITHOUT EVEN THE IMPLIED WARRANTY OF MERCHANTABILITY OR FITNESS
 * FOR A PARTICULAR PURPOSE. The software and documentation provided hereunder
 * is on an "as is" basis, and Memorial Sloan-Kettering Cancer Center has no
 * obligations to provide maintenance, support, updates, enhancements or
 * modifications. In no event shall Memorial Sloan-Kettering Cancer Center be
 * liable to any party for direct, indirect, special, incidental or
 * consequential damages, including lost profits, arising out of the use of this
 * software and its documentation, even if Memorial Sloan-Kettering Cancer
 * Center has been advised of the possibility of such damage.
 */

/*
 * This file is part of cBioPortal.
 *
 * cBioPortal is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/


var orData = function() {
    
    var data = [], retrieved = false;
    
    function convert_data(_input, _profile_type) {
        
        var table_arr = [];
        
        $.each(_input, function(_index, _obj) {
            
            var _unit = [];
            
            if (_profile_type === orAnalysis.profile_type.copy_num) {
                
                _unit[orAnalysis.col_index.copy_num.gene] = _obj["Gene"];
                _unit[orAnalysis.col_index.copy_num.cytoband] = _obj["Cytoband"];
                _unit[orAnalysis.col_index.copy_num.altered_pct] = (_obj["percentage of alteration in altered group"] * 100).toFixed(2) + "%";
                _unit[orAnalysis.col_index.copy_num.unaltered_pct] = (_obj["percentage of alteration in unaltered group"] * 100).toFixed(2) + "%";
                _unit[orAnalysis.col_index.copy_num.log_ratio] = (_obj["Log Ratio"] !== ">3" && _obj["Log Ratio"] !== "<-3")? parseFloat(_obj["Log Ratio"]).toFixed(2): _obj["Log Ratio"];
                _unit[orAnalysis.col_index.copy_num.direction] = define_direction(_profile_type, _obj["p-Value"], _obj["q-Value"], _obj["Log Ratio"]);
                _unit[orAnalysis.col_index.copy_num.p_val] = trim_p_val_copy_num(_obj["p-Value"]);
                _unit[orAnalysis.col_index.copy_num.q_val] = trim_p_val_copy_num(_obj["q-Value"]);
                
            } else if (_profile_type === orAnalysis.profile_type.mutations) {
                
                _unit[orAnalysis.col_index.mutations.gene] = _obj["Gene"];
                _unit[orAnalysis.col_index.copy_num.cytoband] = _obj["Cytoband"];
                _unit[orAnalysis.col_index.mutations.altered_pct] = (_obj["percentage of alteration in altered group"] * 100).toFixed(2) + "%";
                _unit[orAnalysis.col_index.mutations.unaltered_pct] = (_obj["percentage of alteration in unaltered group"] * 100).toFixed(2) + "%";
                _unit[orAnalysis.col_index.mutations.log_ratio] = (_obj["Log Ratio"] !== ">3" && _obj["Log Ratio"] !== "<-3")? parseFloat(_obj["Log Ratio"]).toFixed(2): _obj["Log Ratio"];
                _unit[orAnalysis.col_index.mutations.direction] = define_direction(_profile_type, _obj["p-Value"], _obj["q-Value"], _obj["Log Ratio"]);
                _unit[orAnalysis.col_index.mutations.p_val] = trim_p_val_mutations(_obj["p-Value"]);
                _unit[orAnalysis.col_index.mutations.q_val] = trim_p_val_mutations(_obj["q-Value"]);;

            } else if (_profile_type === orAnalysis.profile_type.mrna) {
                
                _unit[orAnalysis.col_index.mrna.gene] = _obj["Gene"];
                _unit[orAnalysis.col_index.copy_num.cytoband] = _obj["Cytoband"];
                _unit[orAnalysis.col_index.mrna.altered_mean] = parseFloat(_obj["mean of alteration in altered group"]).toFixed(2);
                _unit[orAnalysis.col_index.mrna.unaltered_mean] = parseFloat(_obj["mean of alteration in unaltered group"]).toFixed(2);
                _unit[orAnalysis.col_index.mrna.altered_stdev] = parseFloat(_obj["standard deviation of alteration in altered group"]).toFixed(2);
                _unit[orAnalysis.col_index.mrna.unaltered_stdev] = parseFloat(_obj["standard deviation of alteration in unaltered group"]).toFixed(2);
                _unit[orAnalysis.col_index.mrna.p_val] = trim_p_val_mrna(_obj["mean of alteration in altered group"], _obj["mean of alteration in unaltered group"], _obj["p-Value"]);
                _unit[orAnalysis.col_index.mrna.q_val] = trim_p_val_mrna(_obj["mean of alteration in altered group"], _obj["mean of alteration in unaltered group"], _obj["q-Value"]);
            }
            
            table_arr.push(_unit);
            
        });  
        return table_arr;
    }
    
    function trim_p_val_mutations(_input_str) {
        var _result_str = "";
        var _raw_p_val = parseFloat(_input_str);
        if (_raw_p_val < 0.001) {
            _result_str += "<0.001"; 
        } else _result_str += _raw_p_val.toFixed(3);   
        return _result_str;
    }
    
    function trim_p_val_copy_num(_input_str) {
        var _result_str = "";
        var _raw_p_val = parseFloat(_input_str);
        if (_raw_p_val < 0.001) {
            _result_str += "<0.001"; 
        } else _result_str += _raw_p_val.toFixed(3);
        return _result_str;
    }
    
    function trim_p_val_mrna(_param1, _param2, _input_str) {
        var _result_str = "";
        var _raw_p_val = parseFloat(_input_str);
        if (_raw_p_val < 0.001) {
            _result_str += "<0.001"; 
        } else _result_str += _raw_p_val.toFixed(3);
        
        if (parseFloat(_param1) > parseFloat(_param2)) {
            _result_str += "<img src=\"images/up1.png\"/>";
        } else {
            _result_str += "<img src=\"images/down1.png\"/>";
        }
        return _result_str;
    }
    
    function define_direction(_profile_type, _p_val, _q_val, _log_ratio) {

        var _result_str = "";
        
        if (_profile_type === orAnalysis.profile_type.copy_num) {
            
            if (_log_ratio === ">3") {
                _result_str += "Enriched in altered group";
            } else if (_log_ratio === "<-3") {
                _result_str += "Enriched in unaltered group";
            } else if (_log_ratio > 0) {
                _result_str += "Enriched in altered group";
            } else if (_log_ratio < 0) {
                _result_str += "Enriched in unaltered group";
            } 

        } else if (_profile_type === orAnalysis.profile_type.mutations) {
            if (_log_ratio === ">3") {
                _result_str += "Enriched in altered group";
            } else if (_log_ratio === "<-3") {
                _result_str += "Enriched in unaltered group";
            } else if (_log_ratio > 0) {
                _result_str += "Enriched in altered group";
            } else if (_log_ratio < 0) {
                _result_str += "Enriched in unaltered group";
            } 
        } 
        
        if (_p_val < 0.005 && _q_val < 0.005 && _result_str !== "--") {
            _result_str += "&nbsp;&nbsp;&nbsp;<span class='label label-or-analysis-significant'>Significant</span>";
        }
        
        return _result_str;
    }

    return {
        init: function(_param) {
            $.ajax({
                url: "oranalysis.do",
                method: "POST",
                data: _param
            })  
            .done(function(result) {
                data = result;
                retrieved = true;
            })
            .fail(function( jqXHR, textStatus ) {
                alert( "Request failed: " + textStatus );
            }); 
        },
        get: function(callback_func, _div_id, _table_div, _table_id, _table_title, _profile_type) { 
            var tmp = setInterval(function () { timer(); }, 1000);
            function timer() {
                if (retrieved) {
                    clearInterval(tmp);
                    callback_func(convert_data(data, _profile_type), _div_id, _table_div, _table_id, _table_title, _profile_type);
                }
            }
        }
    };

};
