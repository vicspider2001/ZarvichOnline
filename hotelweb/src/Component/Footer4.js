import React,{Component} from 'react';
import './Header.css';
import {withRouter} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';



const checkinDataUrl = "http://10.1.0.99:3333/getrmstatus"


class Footer4 extends Component {
    constructor(props){
        super(props)
        console.log(">>>Inside RMConstructor", props)
        this.state={
            checkinData:'',
            vacantData:'',
            Corporate:'',
            Individual:'',
            Staff:'',
            Complimentary:'',
            CheckOut:''
            
        }
    }
        
    render(){
        console.log(">>>Inside RMrender",this.state)
        var count=this.state.checkinData;
        if (count!=='green'){
            var result = count.length;
        }
        var vacant=this.state.vacantData;
        var output = vacant.length;

        var corp=this.state.Corporate;
        var corpRate = corp.length;

        var ind=this.state.Individual;
        var indVi = ind.length;

        var staff=this.state.Staff;
        var sta = staff.length;

        var compl=this.state.Complimentary;
        var comp = compl.length;
        
        var chkout=this.state.CheckOut;
        var out = chkout.length;
       
        return (
            <div className="black">
                
                <span>
                   
                    <button className="btn btn-danger buttncontrol6 mb-3 mt-3">Occuppied Rooms: {result}</button>
                    <button className="btn btn-danger buttncontrol6 mb-3 mt-3">Vacant Rooms: {output}</button>
                    <button className="btn buttncontrol6 mb-3 mt-3 setmargin2" style={{backgroundColor:'green', color:'white'}}>Vacant {output}</button>
                    <button className="btn buttncontrol6 mb-3 mt-3" style={{backgroundColor:'blue', color:'white'}}>Corporate {corpRate}</button>
                    <button className="btn buttncontrol6 mb-3 mt-3" style={{backgroundColor:'blueviolet', color:'white'}}>Individual {indVi}</button>
                    <button className="btn buttncontrol6 mb-3 mt-3" style={{backgroundColor:'deeppink', color:'white'}}>Staff {sta}</button>
                    <button className="btn buttncontrol6 mb-3 mt-3" style={{backgroundColor:'orange', color:'white'}}>Complimentary {comp}</button>
                    <button className="btn buttncontrol7 mb-3 mt-3" style={{backgroundColor:'black', color:'white',borderBlockStyle:'solid', borderBlockColor:'white'}}>Check Out {out}</button>
                    
                </span>
                
            </div>
        )
    }

    componentDidMount(){
        console.log (">>> Inside RMdidMount")
        fetch(`${checkinDataUrl}`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            
            this.setState({
                checkinData:data.map(item => item.roomStatus).filter(item=> item !=='green')
                
            })
            this.setState({
                vacantData:data.map(item => item.roomStatus).filter(item=> item ==='green')
                
            })
            this.setState({
                Corporate:data.map(item => item.roomStatus).filter(item=> item ==='blue')
                
            })
            this.setState({
                Individual:data.map(item => item.roomStatus).filter(item=> item ==='blueviolet')
                
            })
            this.setState({
                Staff:data.map(item => item.roomStatus).filter(item=> item ==='deeppink')
                
            })
            
            this.setState({
                Complimentary:data.map(item => item.roomStatus).filter(item=> item ==='orange')
                
            })

            this.setState({
                CheckOut:data.map(item => item.roomStatus).filter(item=> item ==='black')
                
            })
            
            
        })
      
    }
    
}

export default withRouter (Footer4);