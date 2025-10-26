import { Injectable } from "@angular/core";
import { ApplicationInsights, SeverityLevel } from "@microsoft/applicationinsights-web";
import { environment } from "src/environments/environment";

@Injectable()
export class LoggingService {

    appInsights: ApplicationInsights = null;

    constructor() {

        if (environment.applicationInsights) {
            this.appInsights = new ApplicationInsights({
                config: {
                    connectionString: environment.applicationInsights,
                    enableAutoRouteTracking: true // option to log all route changes
                }
            });
    
            this.appInsights.loadAppInsights();
        }
    }

    logPageView(name?: string, url?: string) { // option to call manually
        this.appInsights?.trackPageView({
            name: name,
            uri: url
        });
    }

    logEvent(name: string, properties?: { [key: string]: any }) {
        this.writeOutput(console.info, name, properties);
        this.appInsights?.trackEvent({ name: name }, properties);
    }

    logMetric(name: string, average: number, properties?: { [key: string]: any }) {
        this.appInsights?.trackMetric({ name: name, average: average }, properties);
    }

    logException(exception: Error,
        severityLevel: SeverityLevel|number = SeverityLevel.Error,
        data?: { [key: string]: any }) {
        
        this.writeOutput(console.error, exception, data);
        this.appInsights?.trackException({ exception: exception, severityLevel: severityLevel });
    }

    logWarn(message: string, properties?: { [key: string]: any }) {
        this.writeOutput(console.warn, message, properties);
        this.appInsights.trackTrace({ message: message, severityLevel: SeverityLevel.Warning }, properties)
    }

    logInfo(message: string, properties?: { [key: string]: any }) {
        this.writeOutput(console.info, message, properties);
        this.appInsights?.trackTrace({ message: message, severityLevel: SeverityLevel.Information }, properties);
    }

    logVerbose(message: string, properties?: { [key: string]: any }) {
        this.writeOutput(console.log, message, properties);
        this.appInsights.trackTrace({ message: message, severityLevel: SeverityLevel.Verbose }, properties)
    }

    private writeOutput(func: Function, message: string | Error, properties?: { [key: string]: any })
    {
        if (properties) {
            func(message, properties);
        } else {
            func(message);
        }
    }
}