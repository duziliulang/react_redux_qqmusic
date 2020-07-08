import React, { Component } from 'react';
import { Carousel } from 'antd';
import { getSlider } from "../../api/slider";
import Loading from '../loading/loading';
import './index.less';
class Slider extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoading:true
        }
      }
    componentDidMount() {
        this._getSliderList();
    }
    _getSliderList = ()=>{
        getSlider().then((res)=>{
            console.log(res)
            this.setState({
                sliderList:res.data.slider,
                isLoading:false
            })
        })
    }
    render(){
        const sliderList = this.state.sliderList;
        return(
            <div>
                  <Carousel autoplay>
                    {
                        this.state.isLoading
                        ?<Loading/>
                        :sliderList.map((item, index) => {
                            return <a href={item.linkUrl} key={item.id}><img src={item.picUrl} alt={item.id}/></a>
                        })
                    }
                    </Carousel>
            </div>
        )
    }
}
export default Slider;
