"use strict"

import React, {Component} from 'react';
import PolygonSet from './PolygonSet';
import TextSet from './TextSet';
import SouthSea from './core/SouthSea';
import Legend from './core/Legend';
import PropTypes from 'prop-types';

export default class Maps extends Component {
  static propTypes = {
  };

  constructor(props) {
    super(props);
  }

  render() {

    const {
      data,
      nameKey,
      valueKey,
      defaultColor,
      hoverColor,
      colorArr,
      type,
      hasLegend,
      legendPos,
      hasName,
      popupContent,

      width,
      height,
      mapName,
      geoPath,
      geoData,
      projection,

      onMouseOver,
      onMouseMove,
      onMouseOut,
    } = this.props;

    return (
      <g className='Maps'>
        <PolygonSet
          className= 'PolygonSet'
          data= {data ? data : []}
          nameKey= {nameKey}
          valueKey= {valueKey}
          defaultColor= {defaultColor}
          hoverColor= {hoverColor}
          colorArr= {colorArr}
          projection= {projection}
          geoData= {geoData}
          geoPath= {geoPath}
          onMouseOver= {onMouseOver}
          onMouseMove= {onMouseMove}
          onMouseOut= {onMouseOut}
          {...this.state}
        />

        {hasLegend ?
          <Legend width= {width}
                  height= {height}
                  defaultColor= {defaultColor}
                  colorArr= {colorArr}
                  legendPos= {legendPos} /> :
          null
        }

        {mapName === '中国' ?
          <SouthSea width= {width} height= {height} defaultColor= {defaultColor} /> :
          null
        }

        {
          hasName ?
            <TextSet
              className= 'TextSet'
              projection= {projection}
              geoData= {geoData}
              {...this.state}
            /> :
            null
        }
      </g>
    )
  }
}
