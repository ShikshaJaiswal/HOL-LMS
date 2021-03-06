import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'PublicHolidaysWebPartStrings';
import PublicHolidays from './components/PublicHolidays';
import { IPublicHolidaysProps } from './components/IPublicHolidaysProps';

export interface IPublicHolidaysWebPartProps {
  description: string;
}

export default class PublicHolidaysWebPart extends BaseClientSideWebPart<IPublicHolidaysWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IPublicHolidaysProps> = React.createElement(
      PublicHolidays,
      {
        description: this.properties.description,
        context: this.context,
        userid: this.context.pageContext.user.email
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
