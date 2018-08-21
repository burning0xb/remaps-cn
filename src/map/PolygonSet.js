"use strict"

import React, {Component} from 'react';
import Polygon from './core/Polygon';
import {formatName} from './utils/FormatHelper';
import PropTypes from 'prop-types';

export default class PolygonSet extends Component {
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
      geoData,
      geoPath,
      projection,
      onClick,
      onMouseOver,
      onMouseMove,
      onMouseOut,
    } = this.props;

    let tempDataArr = [];
    let polygons, polygonData, maxData, minData, color, temp;
    let hasDefaultColor;

    if(geoData.type === 'FeatureCollection') {
      polygonData = [];

      // 遍历 features
      geoData.features.forEach(function(d) {
        polygonData.push(d);
      })
    }else if(geoData.type === 'Feature') {
      polygonData = geoData;
    }

    if(polygonData) {
      // 如果不是数组，将其转换成数组
      if(!Array.isArray(polygonData))
        polygonData = [polygonData];

      if (data.length > 0) {
        maxData = polygonData.map((d, i) => {
          data.forEach(item => {
            let tempName = formatName(item[nameKey]);

            if (tempName === d.properties.name) {
              tempDataArr.push(item[valueKey]);
            }
          })

          return tempDataArr;
        })

        maxData = Math.max.apply(null, tempDataArr);
        minData = Math.min.apply(null, tempDataArr);
      }

      polygons = polygonData.map((d, i) => {
        let oldColor;

        hasDefaultColor = true;

        if (data.length > 0) {
          data.map(item => {
            let name = formatName(item[nameKey]);

            if (name === d.properties.name) {
              hasDefaultColor = false;
              temp = Math.floor((colorArr.length - 1) * (item[valueKey] - minData) / (maxData - minData));
              color = colorArr[temp];

              if (maxData === minData)
                color = colorArr[0];

              if (item[valueKey] <= 0)
                color = defaultColor;
            }
          })
        }

        if (!color) {
          color = defaultColor;
        }

        if (hasDefaultColor) {
          color = defaultColor;
        }

        return (
          <Polygon
            key= {'remaps_polygon' + i}
            color= {color}
            hasDefaultColor= {hasDefaultColor}
            hoverColor= {hoverColor}
            projection= {projection}
            geoData= {d}
            geoPath= {geoPath}
            onClick= {onClick}
            onMouseOver= {onMouseOver}
            onMouseMove= {onMouseMove}
            onMouseOut= {onMouseOut}
          />
        )
      })
    }

    return (
      <g>
        {polygons}
      </g>
    )
  }
}
