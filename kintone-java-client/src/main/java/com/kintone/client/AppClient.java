package com.kintone.client;

import com.kintone.client.api.app.AddAppRequest;
import com.kintone.client.api.app.AddAppResponseBody;
import com.kintone.client.api.app.AddFormFieldsRequest;
import com.kintone.client.api.app.AddFormFieldsResponseBody;
import com.kintone.client.api.app.DeleteFormFieldsRequest;
import com.kintone.client.api.app.DeleteFormFieldsResponseBody;
import com.kintone.client.api.app.DeployAppRequest;
import com.kintone.client.api.app.DeployAppResponseBody;
import com.kintone.client.api.app.EvaluateRecordAclRequest;
import com.kintone.client.api.app.EvaluateRecordAclResponseBody;
import com.kintone.client.api.app.GetAppAclPreviewRequest;
import com.kintone.client.api.app.GetAppAclPreviewResponseBody;
import com.kintone.client.api.app.GetAppAclRequest;
import com.kintone.client.api.app.GetAppAclResponseBody;
import com.kintone.client.api.app.GetAppCustomizePreviewRequest;
import com.kintone.client.api.app.GetAppCustomizePreviewResponseBody;
import com.kintone.client.api.app.GetAppCustomizeRequest;
import com.kintone.client.api.app.GetAppCustomizeResponseBody;
import com.kintone.client.api.app.GetAppRequest;
import com.kintone.client.api.app.GetAppResponseBody;
import com.kintone.client.api.app.GetAppSettingsPreviewRequest;
import com.kintone.client.api.app.GetAppSettingsPreviewResponseBody;
import com.kintone.client.api.app.GetAppSettingsRequest;
import com.kintone.client.api.app.GetAppSettingsResponseBody;
import com.kintone.client.api.app.GetAppsRequest;
import com.kintone.client.api.app.GetAppsResponseBody;
import com.kintone.client.api.app.GetDeployStatusRequest;
import com.kintone.client.api.app.GetDeployStatusResponseBody;
import com.kintone.client.api.app.GetFieldAclPreviewRequest;
import com.kintone.client.api.app.GetFieldAclPreviewResponseBody;
import com.kintone.client.api.app.GetFieldAclRequest;
import com.kintone.client.api.app.GetFieldAclResponseBody;
import com.kintone.client.api.app.GetFormFieldsPreviewRequest;
import com.kintone.client.api.app.GetFormFieldsPreviewResponseBody;
import com.kintone.client.api.app.GetFormFieldsRequest;
import com.kintone.client.api.app.GetFormFieldsResponseBody;
import com.kintone.client.api.app.GetFormLayoutPreviewRequest;
import com.kintone.client.api.app.GetFormLayoutPreviewResponseBody;
import com.kintone.client.api.app.GetFormLayoutRequest;
import com.kintone.client.api.app.GetFormLayoutResponseBody;
import com.kintone.client.api.app.GetProcessManagementPreviewRequest;
import com.kintone.client.api.app.GetProcessManagementPreviewResponseBody;
import com.kintone.client.api.app.GetProcessManagementRequest;
import com.kintone.client.api.app.GetProcessManagementResponseBody;
import com.kintone.client.api.app.GetRecordAclPreviewRequest;
import com.kintone.client.api.app.GetRecordAclPreviewResponseBody;
import com.kintone.client.api.app.GetRecordAclRequest;
import com.kintone.client.api.app.GetRecordAclResponseBody;
import com.kintone.client.api.app.GetViewsPreviewRequest;
import com.kintone.client.api.app.GetViewsPreviewResponseBody;
import com.kintone.client.api.app.GetViewsRequest;
import com.kintone.client.api.app.GetViewsResponseBody;
import com.kintone.client.api.app.UpdateAppAclRequest;
import com.kintone.client.api.app.UpdateAppAclResponseBody;
import com.kintone.client.api.app.UpdateAppCustomizeRequest;
import com.kintone.client.api.app.UpdateAppCustomizeResponseBody;
import com.kintone.client.api.app.UpdateAppSettingsRequest;
import com.kintone.client.api.app.UpdateAppSettingsResponseBody;
import com.kintone.client.api.app.UpdateFieldAclRequest;
import com.kintone.client.api.app.UpdateFieldAclResponseBody;
import com.kintone.client.api.app.UpdateFormFieldsRequest;
import com.kintone.client.api.app.UpdateFormFieldsResponseBody;
import com.kintone.client.api.app.UpdateFormLayoutRequest;
import com.kintone.client.api.app.UpdateFormLayoutResponseBody;
import com.kintone.client.api.app.UpdateProcessManagementRequest;
import com.kintone.client.api.app.UpdateProcessManagementResponseBody;
import com.kintone.client.api.app.UpdateRecordAclRequest;
import com.kintone.client.api.app.UpdateRecordAclResponseBody;
import com.kintone.client.api.app.UpdateViewsRequest;
import com.kintone.client.api.app.UpdateViewsResponseBody;
import com.kintone.client.model.app.App;
import com.kintone.client.model.app.AppRightEntity;
import com.kintone.client.model.app.DeployApp;
import com.kintone.client.model.app.DeployStatus;
import com.kintone.client.model.app.EvaluatedRecordRight;
import com.kintone.client.model.app.FieldRight;
import com.kintone.client.model.app.RecordRight;
import com.kintone.client.model.app.View;
import com.kintone.client.model.app.ViewId;
import com.kintone.client.model.app.field.FieldProperty;
import com.kintone.client.model.app.layout.Layout;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;

/** A client that operates app APIs. */
@RequiredArgsConstructor(access = AccessLevel.PACKAGE)
public class AppClient {

    private final InternalClient client;
    private final List<ResponseHandler> handlers;

    /**
    * Creates a preview App. The Deploy App Settings API must be used on the created preview App for
    * the App to become live.
    *
    * @param name the name of App
    * @return the App ID of the created preview App
    */
    public long addApp(String name) {
        return addApp(name, null, null);
    }

    /**
    * Creates a preview App. The Deploy App Settings API must be used on the created preview App for
    * the App to become live.
    *
    * @param name the name of App
    * @param spaceId the Space ID of where the App will be created
    * @param threadId the Thread ID of the thread in the Space where the App will be created
    * @return the App ID of the created preview App
    */
    public long addApp(String name, Long spaceId, Long threadId) {
        AddAppRequest req = new AddAppRequest();
        req.setName(name);
        req.setSpace(spaceId);
        req.setThread(threadId);
        return addApp(req).getApp();
    }

    /**
    * Creates a preview App. The Deploy App Settings API must be used on the created preview App for
    * the App to become live.
    *
    * @param request the request parameters. See {@link AddAppRequest}
    * @return the response data. See {@link AddAppResponseBody}
    */
    public AddAppResponseBody addApp(AddAppRequest request) {
        return client.call(KintoneApi.ADD_APP, request, handlers);
    }

    /**
    * Adds fields to a form of an App. This API updates the pre-live settings. After using this API,
    * use the Deploy App Settings API to deploy the settings to the live App.
    *
    * @param app the App ID
    * @param properties A list of field settings to added
    * @return the revision number of the App settings
    */
    public long addFormFields(long app, List<FieldProperty> properties) {
        return addFormFields(app, properties, null);
    }

    /**
    * Adds fields to a form of an App. This API updates the pre-live settings. After using this API,
    * use the Deploy App Settings API to deploy the settings to the live App.
    *
    * @param app the App ID
    * @param properties A list of field settings to added
    * @param revision the expected revision number of the App settings
    * @return the revision number of the App settings
    */
    public long addFormFields(long app, List<FieldProperty> properties, Long revision) {
        Map<String, FieldProperty> map =
                properties.stream().collect(Collectors.toMap(FieldProperty::getCode, v -> v));
        return addFormFields(app, map, revision);
    }

    /**
    * Adds fields to a form of an App. This API updates the pre-live settings. After using this API,
    * use the Deploy App Settings API to deploy the settings to the live App.
    *
    * @param app the App ID
    * @param properties an object with data of the field settings
    * @return the revision number of the App settings
    */
    public long addFormFields(long app, Map<String, FieldProperty> properties) {
        return addFormFields(app, properties, null);
    }

    /**
    * Adds fields to a form of an App. This API updates the pre-live settings. After using this API,
    * use the Deploy App Settings API to deploy the settings to the live App.
    *
    * @param app the App ID
    * @param properties an object with data of the field settings
    * @param revision the expected revision number of the App settings
    * @return the revision number of the App settings
    */
    public long addFormFields(long app, Map<String, FieldProperty> properties, Long revision) {
        AddFormFieldsRequest req = new AddFormFieldsRequest();
        req.setApp(app);
        req.setProperties(properties);
        req.setRevision(revision);
        return addFormFields(req).getRevision();
    }

    /**
    * Adds fields to a form of an App. This API updates the pre-live settings. After using this API,
    * use the Deploy App Settings API to deploy the settings to the live App.
    *
    * @param request the request parameters. See {@link AddFormFieldsRequest}
    * @return the response data. See {@link AddFormFieldsResponseBody}
    */
    public AddFormFieldsResponseBody addFormFields(AddFormFieldsRequest request) {
        return client.call(KintoneApi.ADD_FORM_FIELDS, request, handlers);
    }

    /**
    * Deletes fields from a form of an App. This API updates the pre-live settings. After using this
    * API, use the Deploy App Settings API to deploy the settings to the live App.
    *
    * @param app the App ID
    * @param fields the list of field codes of the fields to delete
    * @return the revision number of the App settings
    */
    public long deleteFormFields(long app, List<String> fields) {
        return deleteFormFields(app, fields, null);
    }

    /**
    * Deletes fields from a form of an App. This API updates the pre-live settings. After using this
    * API, use the Deploy App Settings API to deploy the settings to the live App.
    *
    * @param app the App ID
    * @param fields the list of field codes of the fields to delete
    * @param revision the expected revision number of the App settings
    * @return the revision number of the App settings
    */
    public long deleteFormFields(long app, List<String> fields, Long revision) {
        DeleteFormFieldsRequest req = new DeleteFormFieldsRequest();
        req.setApp(app);
        req.setFields(fields);
        req.setRevision(revision);
        return deleteFormFields(req).getRevision();
    }

    /**
    * Deletes fields from a form of an App. This API updates the pre-live settings. After using this
    * API, use the Deploy App Settings API to deploy the settings to the live App.
    *
    * @param request the request parameters. See {@link DeleteFormFieldsRequest}
    * @return the response data. See {@link DeleteFormFieldsResponseBody}
    */
    public DeleteFormFieldsResponseBody deleteFormFields(DeleteFormFieldsRequest request) {
        return client.call(KintoneApi.DELETE_FORM_FIELDS, request, handlers);
    }

    /**
    * Updates the settings of a pre-live App to the live App. Using this API is the same as clicking
    * on "Update App" in the Kintone App's settings. Changes made to pre-live settings will not be
    * deployed to the live app until this API is used.
    *
    * @param app the App ID
    */
    public void deployApp(long app) {
        deployApp(app, null, false);
    }

    /**
    * Updates the settings of a pre-live App to the live App. Using this API is the same as clicking
    * on "Update App" in the Kintone App's settings. Changes made to pre-live settings will not be
    * deployed to the live app until this API is used.
    *
    * @param app the App ID
    * @param revision the expected revision number of the App settings
    */
    public void deployApp(long app, Long revision) {
        deployApp(app, revision, false);
    }

    private void deployApp(long app, Long revision, boolean revert) {
        DeployApp deployApp = new DeployApp();
        deployApp.setApp(app);
        deployApp.setRevision(revision);

        List<DeployApp> apps = new ArrayList<>();
        apps.add(deployApp);

        DeployAppRequest req = new DeployAppRequest();
        req.setApps(apps);
        req.setRevert(revert);

        deployApp(req);
    }

    /**
    * Updates the settings of a pre-live App to the live App. Using this API is the same as clicking
    * on "Update App" in the Kintone App's settings. Changes made to pre-live settings will not be
    * deployed to the live app until this API is used.
    *
    * @param request the request parameters. See {@link DeployAppRequest}
    * @return the response data. See {@link DeployAppResponseBody}
    */
    public DeployAppResponseBody deployApp(DeployAppRequest request) {
        return client.call(KintoneApi.DEPLOY_APP, request, handlers);
    }

    /**
    * Evaluates the API user's permissions for records and fields within an App.
    *
    * @param app the App ID
    * @param recordId the record ID
    * @return the record permission object
    */
    public EvaluatedRecordRight evaluateRecordAcl(long app, long recordId) {
        List<Long> recordIds = new ArrayList<>();
        recordIds.add(recordId);
        return evaluateRecordAcl(app, recordIds).get(0);
    }

    /**
    * Evaluates the API user's permissions for records and fields within an App.
    *
    * @param app the App ID
    * @param recordIds the list of record IDs
    * @return a list of objects that contain permissions of the specified records
    */
    public List<EvaluatedRecordRight> evaluateRecordAcl(long app, List<Long> recordIds) {
        EvaluateRecordAclRequest req = new EvaluateRecordAclRequest();
        req.setApp(app);
        req.setIds(recordIds);
        return evaluateRecordAcl(req).getRights();
    }

    /**
    * Evaluates the API user's permissions for records and fields within an App.
    *
    * @param request the request parameters. See {@link EvaluateRecordAclRequest}
    * @return the response data. See {@link EvaluateRecordAclResponseBody}
    */
    public EvaluateRecordAclResponseBody evaluateRecordAcl(EvaluateRecordAclRequest request) {
        return client.call(KintoneApi.EVALUATE_RECORD_ACL, request, handlers);
    }

    /**
    * Gets general information of an App, including the name, description, related Space, creator and
    * updater information.
    *
    * @param id the App ID
    * @return the general information of the specified App
    */
    public App getApp(long id) {
        GetAppRequest request = new GetAppRequest();
        request.setId(id);
        GetAppResponseBody response = getApp(request);
        return new App(
                response.getAppId(),
                response.getCode(),
                response.getName(),
                response.getDescription(),
                response.getSpaceId(),
                response.getThreadId(),
                response.getCreatedAt(),
                response.getCreator(),
                response.getModifiedAt(),
                response.getModifier());
    }

    /**
    * Gets general information of an App, including the name, description, related Space, creator and
    * updater information.
    *
    * @param request the request parameters. See {@link GetAppRequest}
    * @return the response data. See {@link GetAppResponseBody}
    */
    public GetAppResponseBody getApp(GetAppRequest request) {
        return client.call(KintoneApi.GET_APP, request, handlers);
    }

    /**
    * Gets the App permissions of an app.
    *
    * @param app the App ID
    * @return a list of objects that contain data of App permission settings, in order of priority.
    */
    public List<AppRightEntity> getAppAcl(long app) {
        GetAppAclRequest req = new GetAppAclRequest();
        req.setApp(app);
        return getAppAcl(req).getRights();
    }

    /**
    * Gets the App permissions of an app.
    *
    * @param request the request parameters. See {@link GetAppAclRequest}
    * @return the response data. See {@link GetAppAclResponseBody}
    */
    public GetAppAclResponseBody getAppAcl(GetAppAclRequest request) {
        return client.call(KintoneApi.GET_APP_ACL, request, handlers);
    }

    /**
    * Gets the App permissions of an app. This API retrieves the pre-live settings that have not yet
    * been deployed to the live App.
    *
    * @param app the App ID
    * @return a list of objects that contain data of App permission settings, in order of priority.
    */
    public List<AppRightEntity> getAppAclPreview(long app) {
        GetAppAclPreviewRequest req = new GetAppAclPreviewRequest();
        req.setApp(app);
        return getAppAclPreview(req).getRights();
    }

    /**
    * Gets the App permissions of an app. This API retrieves the pre-live settings that have not yet
    * been deployed to the live App.
    *
    * @param request the request parameters. See {@link GetAppAclPreviewRequest}
    * @return the response data. See {@link GetAppAclPreviewResponseBody}
    */
    public GetAppAclPreviewResponseBody getAppAclPreview(GetAppAclPreviewRequest request) {
        return client.call(KintoneApi.GET_APP_ACL_PREVIEW, request, handlers);
    }

    /**
    * Gets the JavaScript and CSS customization settings of an App.
    *
    * @param app the app ID
    * @return the response data. See {@link GetAppCustomizeResponseBody}
    */
    public GetAppCustomizeResponseBody getAppCustomize(long app) {
        GetAppCustomizeRequest req = new GetAppCustomizeRequest();
        req.setApp(app);
        return getAppCustomize(req);
    }

    /**
    * Gets the JavaScript and CSS customization settings of an App.
    *
    * @param request the request parameters. See {@link GetAppCustomizeRequest}
    * @return the response data. See {@link GetAppCustomizeResponseBody}
    */
    public GetAppCustomizeResponseBody getAppCustomize(GetAppCustomizeRequest request) {
        return client.call(KintoneApi.GET_APP_CUSTOMIZE, request, handlers);
    }

    /**
    * Gets the JavaScript and CSS customization settings of an App. This API retrieves the pre-live
    * settings that have not yet been deployed to the live App.
    *
    * @param app the App ID
    * @return the response data. See {@link GetAppCustomizePreviewResponseBody}
    */
    public GetAppCustomizePreviewResponseBody getAppCustomizePreview(long app) {
        GetAppCustomizePreviewRequest req = new GetAppCustomizePreviewRequest();
        req.setApp(app);
        return getAppCustomizePreview(req);
    }

    /**
    * Gets the JavaScript and CSS customization settings of an App. This API retrieves the pre-live
    * settings that have not yet been deployed to the live App.
    *
    * @param request the request parameters. See {@link GetAppCustomizePreviewRequest}
    * @return the response data. See {@link GetAppCustomizePreviewResponseBody}
    */
    public GetAppCustomizePreviewResponseBody getAppCustomizePreview(
            GetAppCustomizePreviewRequest request) {
        return client.call(KintoneApi.GET_APP_CUSTOMIZE_PREVIEW, request, handlers);
    }

    /**
    * Gets general information of multiple Apps, including the name, description, related Space,
    * creator and updater information.
    *
    * @param request the request parameters. See {@link GetAppsRequest}
    * @return the response data. See {@link GetAppsResponseBody}
    */
    public GetAppsResponseBody getApps(GetAppsRequest request) {
        return client.call(KintoneApi.GET_APPS, request, handlers);
    }

    /**
    * Gets general information of multiple Apps by specifying the App codes.
    *
    * @param codes the list of App codes
    * @return a list of objects that contain the general information of Apps
    */
    public List<App> getAppsByCodes(List<String> codes) {
        GetAppsRequest req = new GetAppsRequest();
        req.setCodes(codes);
        return getApps(req).getApps();
    }

    /**
    * Gets general information of multiple Apps by specifying the App IDs.
    *
    * @param ids the list of App IDs
    * @return a list of objects that contain the general information of Apps
    */
    public List<App> getAppsByIds(List<Long> ids) {
        GetAppsRequest req = new GetAppsRequest();
        req.setIds(ids);
        return getApps(req).getApps();
    }

    /**
    * Gets the description, name, icon, revision and color theme of an App.
    *
    * @param app the App ID
    * @return the response data. See {@link GetAppSettingsResponseBody}
    */
    public GetAppSettingsResponseBody getAppSettings(long app) {
        return getAppSettings(app, null);
    }

    /**
    * Gets the description, name, icon, revision and color theme of an App.
    *
    * @param app the App ID
    * @param lang the localization language setting
    * @return the response data. See {@link GetAppSettingsResponseBody}
    */
    public GetAppSettingsResponseBody getAppSettings(long app, String lang) {
        GetAppSettingsRequest req = new GetAppSettingsRequest();
        req.setApp(app);
        req.setLang(lang);
        return getAppSettings(req);
    }

    /**
    * Gets the description, name, icon, revision and color theme of an App.
    *
    * @param request the request parameters. See {@link GetAppSettingsRequest}
    * @return the response data. See {@link GetAppSettingsResponseBody}
    */
    public GetAppSettingsResponseBody getAppSettings(GetAppSettingsRequest request) {
        return client.call(KintoneApi.GET_APP_SETTINGS, request, handlers);
    }

    /**
    * Gets the description, name, icon, revision and color theme of an App. This API retrieves the
    * pre-live settings that have not yet been deployed to the live App.
    *
    * @param app the App ID
    * @return the response data. See {@link GetAppSettingsPreviewResponseBody}
    */
    public GetAppSettingsPreviewResponseBody getAppSettingsPreview(long app) {
        return getAppSettingsPreview(app, null);
    }

    /**
    * Gets the description, name, icon, revision and color theme of an App. This API retrieves the
    * pre-live settings that have not yet been deployed to the live App.
    *
    * @param app the App ID
    * @param lang the localization language setting
    * @return the response data. See {@link GetAppSettingsPreviewResponseBody}
    */
    public GetAppSettingsPreviewResponseBody getAppSettingsPreview(long app, String lang) {
        GetAppSettingsPreviewRequest req = new GetAppSettingsPreviewRequest();
        req.setApp(app);
        req.setLang(lang);
        return getAppSettingsPreview(req);
    }

    /**
    * Gets the description, name, icon, revision and color theme of an App. This API retrieves the
    * pre-live settings that have not yet been deployed to the live App.
    *
    * @param request the request parameters. See {@link GetAppSettingsPreviewRequest}
    * @return the response data. See {@link GetAppSettingsPreviewResponseBody}
    */
    public GetAppSettingsPreviewResponseBody getAppSettingsPreview(
            GetAppSettingsPreviewRequest request) {
        return client.call(KintoneApi.GET_APP_SETTINGS_PREVIEW, request, handlers);
    }

    /**
    * Gets the deployment status of the App settings for multiple Apps.
    *
    * @param app the App ID
    * @return the status of the deployment of App settings
    */
    public DeployStatus getDeployStatus(long app) {
        GetDeployStatusRequest req = new GetDeployStatusRequest();
        List<Long> apps = new ArrayList<>();
        apps.add(app);
        req.setApps(apps);
        return getDeployStatus(req).getApps().get(0).getStatus();
    }

    /**
    * Gets the deployment status of the App settings for multiple Apps.
    *
    * @param request the request parameters. See {@link GetDeployStatusRequest}
    * @return the response data. See {@link GetDeployStatusResponseBody}
    */
    public GetDeployStatusResponseBody getDeployStatus(GetDeployStatusRequest request) {
        return client.call(KintoneApi.GET_DEPLOY_STATUS, request, handlers);
    }

    /**
    * Gets the Field permission settings of an App.
    *
    * @param app the App ID
    * @return a list of objects that contain Field permission settings
    */
    public List<FieldRight> getFieldAcl(long app) {
        GetFieldAclRequest req = new GetFieldAclRequest();
        req.setApp(app);
        return getFieldAcl(req).getRights();
    }

    /**
    * Gets the Field permission settings of an App.
    *
    * @param request the request parameters. See {@link GetFieldAclRequest}
    * @return the response data. See {@link GetFieldAclResponseBody}
    */
    public GetFieldAclResponseBody getFieldAcl(GetFieldAclRequest request) {
        return client.call(KintoneApi.GET_FIELD_ACL, request, handlers);
    }

    /**
    * Gets the Field permission settings of an App. This API retrieves the pre-live settings that
    * have not yet been deployed to the live App.
    *
    * @param app the App ID
    * @return a list of objects that contain Field permission settings.
    */
    public List<FieldRight> getFieldAclPreview(long app) {
        GetFieldAclPreviewRequest req = new GetFieldAclPreviewRequest();
        req.setApp(app);
        return getFieldAclPreview(req).getRights();
    }

    /**
    * Gets the Field permission settings of an App. This API retrieves the pre-live settings that
    * have not yet been deployed to the live App.
    *
    * @param request the request parameters. See {@link GetFieldAclPreviewRequest}
    * @return the response data. See {@link GetFieldAclPreviewResponseBody}
    */
    public GetFieldAclPreviewResponseBody getFieldAclPreview(GetFieldAclPreviewRequest request) {
        return client.call(KintoneApi.GET_FIELD_ACL_PREVIEW, request, handlers);
    }

    /**
    * Gets the field settings of an App.
    *
    * @param app the App ID
    * @return an object that maps the field codes to the field settings
    */
    public Map<String, FieldProperty> getFormFields(long app) {
        return getFormFields(app, null);
    }

    /**
    * Gets the field settings of an App.
    *
    * @param app the App ID
    * @param lang the localization language setting
    * @return an object that maps the field codes to the field settings
    */
    public Map<String, FieldProperty> getFormFields(long app, String lang) {
        GetFormFieldsRequest req = new GetFormFieldsRequest();
        req.setApp(app);
        req.setLang(lang);
        return getFormFields(req).getProperties();
    }

    /**
    * Gets the field settings of an App.
    *
    * @param request the request parameters. See {@link GetFormFieldsRequest}
    * @return the response data. See {@link GetFormFieldsResponseBody}
    */
    public GetFormFieldsResponseBody getFormFields(GetFormFieldsRequest request) {
        return client.call(KintoneApi.GET_FORM_FIELDS, request, handlers);
    }

    /**
    * Gets the field settings of an App. This API retrieves the pre-live settings that have not yet
    * been deployed to the live App.
    *
    * @param app the App ID
    * @return an object that maps the field codes to field settings
    */
    public Map<String, FieldProperty> getFormFieldsPreview(long app) {
        return getFormFieldsPreview(app, null);
    }

    /**
    * Gets the field settings of an App. This API retrieves the pre-live settings that have not yet
    * been deployed to the live App.
    *
    * @param app the App ID
    * @param lang the localization language setting
    * @return an object that maps the field codes to the field settings
    */
    public Map<String, FieldProperty> getFormFieldsPreview(long app, String lang) {
        GetFormFieldsPreviewRequest req = new GetFormFieldsPreviewRequest();
        req.setApp(app);
        req.setLang(lang);
        return getFormFieldsPreview(req).getProperties();
    }

    /**
    * Gets the field settings of an App. This API retrieves the pre-live settings that have not yet
    * been deployed to the live App.
    *
    * @param request the request parameters. See {@link GetFormFieldsPreviewRequest}
    * @return the response data. See {@link GetFormFieldsPreviewResponseBody}
    */
    public GetFormFieldsPreviewResponseBody getFormFieldsPreview(
            GetFormFieldsPreviewRequest request) {
        return client.call(KintoneApi.GET_FORM_FIELDS_PREVIEW, request, handlers);
    }

    /**
    * Gets the field layout info of a form in an App.
    *
    * @param app the App ID
    * @return a list of field layouts for each row
    */
    public List<Layout> getFormLayout(long app) {
        GetFormLayoutRequest req = new GetFormLayoutRequest();
        req.setApp(app);
        return getFormLayout(req).getLayout();
    }

    /**
    * Gets the field layout info of a form in an App.
    *
    * @param request the request parameters. See {@link GetFormLayoutRequest}
    * @return the response data. See {@link GetFormLayoutResponseBody}
    */
    public GetFormLayoutResponseBody getFormLayout(GetFormLayoutRequest request) {
        return client.call(KintoneApi.GET_FORM_LAYOUT, request, handlers);
    }

    /**
    * Gets the field layout info of a form in an App. This API retrieves the pre-live settings that
    * have not yet been deployed to the live App.
    *
    * @param app the App ID
    * @return a list of field layouts for each row
    */
    public List<Layout> getFormLayoutPreview(long app) {
        GetFormLayoutPreviewRequest req = new GetFormLayoutPreviewRequest();
        req.setApp(app);
        return getFormLayoutPreview(req).getLayout();
    }

    /**
    * Gets the field layout info of a form in an App. This API retrieves the pre-live settings that
    * have not yet been deployed to the live App.
    *
    * @param request the request parameters. See {@link GetFormLayoutPreviewRequest}
    * @return the response data. See {@link GetFormLayoutPreviewResponseBody}
    */
    public GetFormLayoutPreviewResponseBody getFormLayoutPreview(
            GetFormLayoutPreviewRequest request) {
        return client.call(KintoneApi.GET_FORM_LAYOUT_PREVIEW, request, handlers);
    }

    /**
    * Gets the process management settings of an App.
    *
    * @param app the App ID
    * @return the response data. See {@link GetProcessManagementResponseBody}
    */
    public GetProcessManagementResponseBody getProcessManagement(long app) {
        return getProcessManagement(app, null);
    }

    /**
    * Gets the process management settings of an App.
    *
    * @param app the App ID
    * @param lang the localization language setting
    * @return the response data. See {@link GetProcessManagementResponseBody}
    */
    public GetProcessManagementResponseBody getProcessManagement(long app, String lang) {
        GetProcessManagementRequest req = new GetProcessManagementRequest();
        req.setApp(app);
        req.setLang(lang);
        return getProcessManagement(req);
    }

    /**
    * Gets the process management settings of an App.
    *
    * @param request the request parameters. See {@link GetProcessManagementRequest}
    * @return the response data. See {@link GetProcessManagementResponseBody}
    */
    public GetProcessManagementResponseBody getProcessManagement(
            GetProcessManagementRequest request) {
        return client.call(KintoneApi.GET_PROCESS_MANAGEMENT, request, handlers);
    }

    /**
    * Gets the process management settings of an App. This API retrieves the pre-live settings that
    * have not yet been deployed to the live App.
    *
    * @param app the App ID
    * @return the response data. See {@link GetProcessManagementPreviewResponseBody}
    */
    public GetProcessManagementPreviewResponseBody getProcessManagementPreview(long app) {
        return getProcessManagementPreview(app, null);
    }

    /**
    * Gets the process management settings of an App. This API retrieves the pre-live settings that
    * have not yet been deployed to the live App.
    *
    * @param app the App ID
    * @param lang the localization language setting
    * @return the response data. See {@link GetProcessManagementPreviewResponseBody}
    */
    public GetProcessManagementPreviewResponseBody getProcessManagementPreview(
            long app, String lang) {
        GetProcessManagementPreviewRequest req = new GetProcessManagementPreviewRequest();
        req.setApp(app);
        req.setLang(lang);
        return getProcessManagementPreview(req);
    }

    /**
    * Gets the process management settings of an App. This API retrieves the pre-live settings that
    * have not yet been deployed to the live App.
    *
    * @param request the request parameters. See {@link GetProcessManagementPreviewRequest}
    * @return the response data. See {@link GetProcessManagementPreviewResponseBody}
    */
    public GetProcessManagementPreviewResponseBody getProcessManagementPreview(
            GetProcessManagementPreviewRequest request) {
        return client.call(KintoneApi.GET_PROCESS_MANAGEMENT_PREVIEW, request, handlers);
    }

    /**
    * Gets the record permission settings of an App.
    *
    * @param app the App ID
    * @return a list of objects that contain record permission settings
    */
    public List<RecordRight> getRecordAcl(long app) {
        return getRecordAcl(app, null);
    }

    /**
    * Gets the record permission settings of an App.
    *
    * @param app the App ID
    * @param lang the localization language setting
    * @return a list of objects that contain record permission settings
    */
    public List<RecordRight> getRecordAcl(long app, String lang) {
        GetRecordAclRequest req = new GetRecordAclRequest();
        req.setApp(app);
        req.setLang(lang);
        return getRecordAcl(req).getRights();
    }

    /**
    * Gets the record permission settings of an App.
    *
    * @param request the request parameters. See {@link GetRecordAclRequest}
    * @return the response data. See {@link GetRecordAclResponseBody}
    */
    public GetRecordAclResponseBody getRecordAcl(GetRecordAclRequest request) {
        return client.call(KintoneApi.GET_RECORD_ACL, request, handlers);
    }

    /**
    * Gets the Record permission settings of an App. This API retrieves the pre-live settings that
    * have not yet been deployed to the live App.
    *
    * @param app the App ID
    * @return a list of objects that contain record permission settings
    */
    public List<RecordRight> getRecordAclPreview(long app) {
        return getRecordAclPreview(app, null);
    }

    /**
    * Gets the Record permission settings of an App. This API retrieves the pre-live settings that
    * have not yet been deployed to the live App.
    *
    * @param app the App ID
    * @param lang the localization language setting
    * @return a list of objects that contain record permission settings
    */
    public List<RecordRight> getRecordAclPreview(long app, String lang) {
        GetRecordAclPreviewRequest req = new GetRecordAclPreviewRequest();
        req.setApp(app);
        req.setLang(lang);
        return getRecordAclPreview(req).getRights();
    }

    /**
    * Gets the Record permission settings of an App. This API retrieves the pre-live settings that
    * have not yet been deployed to the live App.
    *
    * @param request the request parameters. See {@link GetRecordAclPreviewRequest}
    * @return the response data. See {@link GetRecordAclPreviewResponseBody}
    */
    public GetRecordAclPreviewResponseBody getRecordAclPreview(GetRecordAclPreviewRequest request) {
        return client.call(KintoneApi.GET_RECORD_ACL_PREVIEW, request, handlers);
    }

    /**
    * Gets the View settings of an App.
    *
    * @param app the App ID
    * @return an object that maps the View names to the View settings
    */
    public Map<String, View> getViews(long app) {
        return getViews(app, null);
    }

    /**
    * Gets the View settings of an App.
    *
    * @param app the App ID
    * @param lang the localization language setting
    * @return an object that maps the View names to the View settings
    */
    public Map<String, View> getViews(long app, String lang) {
        GetViewsRequest req = new GetViewsRequest();
        req.setApp(app);
        req.setLang(lang);
        return getViews(req).getViews();
    }

    /**
    * Gets the View settings of an App.
    *
    * @param request the request parameters. See {@link GetViewsRequest}
    * @return the response data. See {@link GetViewsResponseBody}
    */
    public GetViewsResponseBody getViews(GetViewsRequest request) {
        return client.call(KintoneApi.GET_VIEWS, request, handlers);
    }

    /**
    * Gets the View settings of an App. This API retrieves the pre-live settings that have not yet
    * been deployed to the live App.
    *
    * @param app the App ID
    * @return an object that maps the View names to the View settings
    */
    public Map<String, View> getViewsPreview(long app) {
        return getViewsPreview(app, null);
    }

    /**
    * Gets the View settings of an App. This API retrieves the pre-live settings that have not yet
    * been deployed to the live App.
    *
    * @param app the App ID
    * @param lang the localization language setting
    * @return an object that maps the View names to the View settings
    */
    public Map<String, View> getViewsPreview(long app, String lang) {
        GetViewsPreviewRequest req = new GetViewsPreviewRequest();
        req.setApp(app);
        req.setLang(lang);
        return getViewsPreview(req).getViews();
    }

    /**
    * Gets the View settings of an App. This API retrieves the pre-live settings that have not yet
    * been deployed to the live App.
    *
    * @param request the request parameters. See {@link GetViewsPreviewRequest}
    * @return the response data. See {@link GetViewsPreviewResponseBody}
    */
    public GetViewsPreviewResponseBody getViewsPreview(GetViewsPreviewRequest request) {
        return client.call(KintoneApi.GET_VIEWS_PREVIEW, request, handlers);
    }

    /**
    * Cancel all changes made to the pre-live settings. The pre-live settings will be reverted back
    * to the current settings of the live app.
    *
    * @param app the App ID
    */
    public void revertApp(long app) {
        deployApp(app, null, true);
    }

    /**
    * Cancel all changes made to the pre-live settings. The pre-live settings will be reverted back
    * to the current settings of the live app.
    *
    * @param app the App ID
    * @param revision the expected revision number of the App settings
    */
    public void revertApp(long app, Long revision) {
        deployApp(app, revision, true);
    }

    /**
    * Updates the App permissions of an App.
    *
    * @param app the App ID
    * @param rights the list of App permission settings, in order of priority.
    * @return the revision number of the App settings
    */
    public long updateAppAcl(long app, List<AppRightEntity> rights) {
        return updateAppAcl(app, rights, null);
    }

    /**
    * Updates the App permissions of an App.
    *
    * @param app the App ID
    * @param rights the list of App permission settings, in order of priority.
    * @param revision the expected revision number of the App settings
    * @return the revision number of the App settings
    */
    public long updateAppAcl(long app, List<AppRightEntity> rights, Long revision) {
        UpdateAppAclRequest req = new UpdateAppAclRequest();
        req.setApp(app);
        req.setRights(rights);
        req.setRevision(revision);
        return updateAppAcl(req).getRevision();
    }

    /**
    * Updates the App permissions of an App.
    *
    * @param request the request parameters. See {@link UpdateAppAclRequest}
    * @return the response data. See {@link UpdateAppAclResponseBody}
    */
    public UpdateAppAclResponseBody updateAppAcl(UpdateAppAclRequest request) {
        return client.call(KintoneApi.UPDATE_APP_ACL, request, handlers);
    }

    /**
    * Updates the JavaScript and CSS customization settings of an App. This API updates the pre-live
    * settings. After using this API, use the Deploy App Settings API to deploy the settings to the
    * live App.
    *
    * @param request the request parameters. See {@link UpdateAppCustomizeRequest}
    * @return the response data. See {@link UpdateAppCustomizeResponseBody}
    */
    public UpdateAppCustomizeResponseBody updateAppCustomize(UpdateAppCustomizeRequest request) {
        return client.call(KintoneApi.UPDATE_APP_CUSTOMIZE, request, handlers);
    }

    /**
    * Updates the description, name, icon, revision and color theme of an App. This API updates the
    * pre-live settings. After using this API, use the Deploy App Settings API to deploy the settings
    * to the live App.
    *
    * @param request the request parameters. See {@link UpdateAppSettingsRequest}
    * @return the response data. See {@link UpdateAppSettingsResponseBody}
    */
    public UpdateAppSettingsResponseBody updateAppSettings(UpdateAppSettingsRequest request) {
        return client.call(KintoneApi.UPDATE_APP_SETTINGS, request, handlers);
    }

    /**
    * Updates the Field permission settings of an App.
    *
    * @param app the App ID
    * @param rights the list of Field permission settings, in order of priority
    * @return the revision number of the App settings
    */
    public long updateFieldAcl(long app, List<FieldRight> rights) {
        return updateFieldAcl(app, rights, null);
    }

    /**
    * Updates the Field permission settings of an App.
    *
    * @param app the App ID
    * @param rights the list of Field permission settings, in order of priority
    * @param revision the expected revision number of the App settings
    * @return the revision number of the App settings
    */
    public long updateFieldAcl(long app, List<FieldRight> rights, Long revision) {
        UpdateFieldAclRequest req = new UpdateFieldAclRequest();
        req.setApp(app);
        req.setRights(rights);
        req.setRevision(revision);
        return updateFieldAcl(req).getRevision();
    }

    /**
    * Updates the Field permission settings of an App.
    *
    * @param request the request parameters. See {@link UpdateFieldAclRequest}
    * @return the response data. See {@link UpdateFieldAclResponseBody}
    */
    public UpdateFieldAclResponseBody updateFieldAcl(UpdateFieldAclRequest request) {
        return client.call(KintoneApi.UPDATE_FIELD_ACL, request, handlers);
    }

    /**
    * Updates the field settings of fields in a form of an App. This API updates the pre-live
    * settings. After using this API, use the Deploy App Settings API to deploy the settings to the
    * live App.
    *
    * @param app the App ID
    * @param properties a list of field settings
    * @return the revision number of the App settings
    */
    public long updateFormFields(long app, List<FieldProperty> properties) {
        return updateFormFields(app, properties, null);
    }

    /**
    * Updates the field settings of fields in a form of an App. This API updates the pre-live
    * settings. After using this API, use the Deploy App Settings API to deploy the settings to the
    * live App.
    *
    * @param app the App ID
    * @param properties a list of field settings
    * @param revision The expected revision number of the App settings
    * @return the revision number of the App settings
    */
    public long updateFormFields(long app, List<FieldProperty> properties, Long revision) {
        Map<String, FieldProperty> map =
                properties.stream().collect(Collectors.toMap(FieldProperty::getCode, v -> v));
        return updateFormFields(app, map, revision);
    }

    /**
    * Updates the field settings of fields in a form of an App. This API updates the pre-live
    * settings. After using this API, use the Deploy App Settings API to deploy the settings to the
    * live App.
    *
    * @param app the App ID
    * @param properties an object that maps the field codes to the field settings
    * @return the revision number of the App settings
    */
    public long updateFormFields(long app, Map<String, FieldProperty> properties) {
        return updateFormFields(app, properties, null);
    }

    /**
    * Updates the field settings of fields in a form of an App. This API updates the pre-live
    * settings. After using this API, use the Deploy App Settings API to deploy the settings to the
    * live App.
    *
    * @param app the App ID
    * @param properties an object that maps the field codes to the field settings
    * @param revision The expected revision number of the App settings
    * @return the revision number of the App settings
    */
    public long updateFormFields(long app, Map<String, FieldProperty> properties, Long revision) {
        UpdateFormFieldsRequest req = new UpdateFormFieldsRequest();
        req.setApp(app);
        req.setProperties(properties);
        req.setRevision(revision);
        return updateFormFields(req).getRevision();
    }

    /**
    * Updates the field settings of fields in a form of an App. This API updates the pre-live
    * settings. After using this API, use the Deploy App Settings API to deploy the settings to the
    * live App.
    *
    * @param request the request parameters. See {@link UpdateFormFieldsRequest}
    * @return the response data. See {@link UpdateFormFieldsResponseBody}
    */
    public UpdateFormFieldsResponseBody updateFormFields(UpdateFormFieldsRequest request) {
        return client.call(KintoneApi.UPDATE_FORM_FIELDS, request, handlers);
    }

    /**
    * Updates the field layout info of a form in an App. This API updates the pre-live settings.
    * After using this API, use the Deploy App Settings API to deploy the settings to the live App.
    *
    * @param app the App ID
    * @param layouts the list of field layouts
    * @return the revision number of the App settings
    */
    public long updateFormLayout(long app, List<Layout> layouts) {
        return updateFormLayout(app, layouts, null);
    }

    /**
    * Updates the field layout info of a form in an App. This API updates the pre-live settings.
    * After using this API, use the Deploy App Settings API to deploy the settings to the live App.
    *
    * @param app the App ID
    * @param layouts the list of field layouts
    * @param revision the expected revision number of the App settings
    * @return the revision number of the App settings
    */
    public long updateFormLayout(long app, List<Layout> layouts, Long revision) {
        UpdateFormLayoutRequest req = new UpdateFormLayoutRequest();
        req.setApp(app);
        req.setLayout(layouts);
        req.setRevision(revision);
        return updateFormLayout(req).getRevision();
    }

    /**
    * Updates the field layout info of a form in an App. This API updates the pre-live settings.
    * After using this API, use the Deploy App Settings API to deploy the settings to the live App.
    *
    * @param request the request parameters. See {@link UpdateFormLayoutRequest}
    * @return the response data. See {@link UpdateFormLayoutResponseBody}
    */
    public UpdateFormLayoutResponseBody updateFormLayout(UpdateFormLayoutRequest request) {
        return client.call(KintoneApi.UPDATE_FORM_LAYOUT, request, handlers);
    }

    /**
    * Updates the process management settings of an App. After using this API, the Deploy App
    * Settings API must be used for the settings to be deployed to the live App.
    *
    * @param request the request parameters. See {@link UpdateProcessManagementRequest}
    * @return the response data. See {@link UpdateProcessManagementResponseBody}
    */
    public UpdateProcessManagementResponseBody updateProcessManagement(
            UpdateProcessManagementRequest request) {
        return client.call(KintoneApi.UPDATE_PROCESS_MANAGEMENT, request, handlers);
    }

    /**
    * Updates the Record permission settings of an App.
    *
    * @param app the App ID
    * @param rights a list of record permission settings, in order of priority.
    * @return the revision number of the App settings
    */
    public long updateRecordAcl(long app, List<RecordRight> rights) {
        return updateRecordAcl(app, rights, null);
    }

    /**
    * Updates the Record permission settings of an App.
    *
    * @param app the App ID
    * @param rights a list of record permission settings, in order of priority.
    * @param revision the expected revision number of the App settings
    * @return the revision number of the App settings
    */
    public long updateRecordAcl(long app, List<RecordRight> rights, Long revision) {
        UpdateRecordAclRequest req = new UpdateRecordAclRequest();
        req.setApp(app);
        req.setRights(rights);
        req.setRevision(revision);
        return updateRecordAcl(req).getRevision();
    }

    /**
    * Updates the Record permission settings of an App.
    *
    * @param request the request parameters. See {@link UpdateRecordAclRequest}
    * @return the response data. See {@link UpdateRecordAclResponseBody}
    */
    public UpdateRecordAclResponseBody updateRecordAcl(UpdateRecordAclRequest request) {
        return client.call(KintoneApi.UPDATE_RECORD_ACL, request, handlers);
    }

    /**
    * Updates the View settings of an App. This API updates the pre-live settings. After using this
    * API, use the Deploy App Settings API to deploy the settings to the live App.
    *
    * @param app the App ID
    * @param views an object that maps the View names to the View settings
    * @return an object containing data of the View IDs
    */
    public Map<String, ViewId> updateViews(long app, Map<String, View> views) {
        return updateViews(app, views, null);
    }

    /**
    * Updates the View settings of an App. This API updates the pre-live settings. After using this
    * API, use the Deploy App Settings API to deploy the settings to the live App.
    *
    * @param app the App ID
    * @param views an object that maps the View names to the View settings
    * @param revision the expected revision number of the App settings
    * @return an object containing data of the View IDs
    */
    public Map<String, ViewId> updateViews(long app, Map<String, View> views, Long revision) {
        UpdateViewsRequest req = new UpdateViewsRequest();
        req.setApp(app);
        req.setViews(views);
        req.setRevision(revision);
        return updateViews(req).getViews();
    }

    /**
    * Updates the View settings of an App. This API updates the pre-live settings. After using this
    * API, use the Deploy App Settings API to deploy the settings to the live App.
    *
    * @param request the request parameters. See {@link UpdateViewsRequest}
    * @return the response data. See {@link UpdateViewsResponseBody}
    */
    public UpdateViewsResponseBody updateViews(UpdateViewsRequest request) {
        return client.call(KintoneApi.UPDATE_VIEWS, request, handlers);
    }
}
