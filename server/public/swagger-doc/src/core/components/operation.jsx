import React, { PureComponent } from "react"
import PropTypes from "prop-types"
import { getList } from "core/utils"
import * as CustomPropTypes from "core/proptypes"
import { sanitizeUrl } from "core/utils"

//import "less/opblock"

export default class Operation extends PureComponent {
  static propTypes = {
    path: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    operation: PropTypes.object.isRequired,
    showSummary: PropTypes.bool,
    isShown: PropTypes.bool.isRequired,

    tagKey: PropTypes.string,
    operationKey: PropTypes.string,
    jumpToKey: CustomPropTypes.arrayOrString.isRequired,

    allowTryItOut: PropTypes.bool,

    displayOperationId: PropTypes.bool,
    displayRequestDuration: PropTypes.bool,

    response: PropTypes.object,
    request: PropTypes.object,

    getComponent: PropTypes.func.isRequired,
    authActions: PropTypes.object,
    authSelectors: PropTypes.object,
    specActions: PropTypes.object.isRequired,
    specSelectors: PropTypes.object.isRequired,
    oas3Actions: PropTypes.object.isRequired,
    layoutActions: PropTypes.object.isRequired,
    layoutSelectors: PropTypes.object.isRequired,
    fn: PropTypes.object.isRequired,
    getConfigs: PropTypes.func.isRequired
  }

  static defaultProps = {
    showSummary: true,
    response: null,
    allowTryItOut: true,
    displayOperationId: false,
    displayRequestDuration: false
  }

  constructor(props, context) {
    super(props, context)
    this.state = {
      tryItOutEnabled: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.response !== this.props.response) {
      this.setState({ executeInProgress: false })
    }
  }

  toggleShown =() => {
    let { layoutActions, tagKey, operationKey, isShown } = this.props
    const isShownKey = ["operations", tagKey, operationKey]

    layoutActions.show(isShownKey, !isShown)
  }

  onTryoutClick =() => {
    this.setState({tryItOutEnabled: !this.state.tryItOutEnabled})
  }

  onCancelClick =() => {
    let { specActions, path, method } = this.props
    this.setState({tryItOutEnabled: !this.state.tryItOutEnabled})
    specActions.clearValidateParams([path, method])
  }

  onExecute = () => {
    this.setState({ executeInProgress: true })
  }

  render() {
    let {
      operationKey,
      tagKey,
      isShown,
      jumpToKey,
      path,
      method,
      operation,
      showSummary,
      response,
      request,
      allowTryItOut,
      displayOperationId,
      displayRequestDuration,
      fn,
      getComponent,
      specActions,
      specSelectors,
      authActions,
      authSelectors,
      getConfigs,
      oas3Actions
    } = this.props

    let summary = operation.get("summary")
    let description = operation.get("description")
    let deprecated = operation.get("deprecated")
    let externalDocs = operation.get("externalDocs")
    let responses = operation.get("responses")
    let security = operation.get("security") || specSelectors.security()
    let produces = operation.get("produces")
    let schemes = operation.get("schemes")
    let parameters = getList(operation, ["parameters"])
    let operationId = operation.get("__originalOperationId")
    let operationScheme = specSelectors.operationScheme(path, method)

    const Responses = getComponent("responses")
    const Parameters = getComponent( "parameters" )
    const Execute = getComponent( "execute" )
    const Clear = getComponent( "clear" )
    const AuthorizeOperationBtn = getComponent( "authorizeOperationBtn" )
    const JumpToPath = getComponent("JumpToPath", true)
    const Collapse = getComponent( "Collapse" )
    const Markdown = getComponent( "Markdown" )
    const Schemes = getComponent( "schemes" )

    const { deepLinking } = getConfigs()

    const isDeepLinkingEnabled = deepLinking && deepLinking !== "false"

    // Merge in Live Response
    if(responses && response && response.size > 0) {
      let notDocumented = !responses.get(String(response.get("status")))
      response = response.set("notDocumented", notDocumented)
    }

    let { tryItOutEnabled } = this.state
    let onChangeKey = [ path, method ] // Used to add values to _this_ operation ( indexed by path and method )

    return (
        <div className={deprecated ? "opblock opblock-deprecated" : isShown ? `opblock opblock-${method} is-open` : `opblock opblock-${method}`} id={`operations-${tagKey}-${operationKey}`} >
          <div className={`opblock-summary opblock-summary-${method}`} onClick={this.toggleShown} >
              <span className="opblock-summary-method">{method.toUpperCase()}</span>
              <span className={ deprecated ? "opblock-summary-path__deprecated" : "opblock-summary-path" } >
              <a
                className="nostyle"
                onClick={isDeepLinkingEnabled ? (e) => e.preventDefault() : null}
                href={isDeepLinkingEnabled ? `#/${tagKey}/${operationKey}` : null}>
                <span>{path}</span>
              </a>
                <JumpToPath path={jumpToKey} />
              </span>

            { !showSummary ? null :
                <div className="opblock-summary-description">
                  { summary }
                </div>
            }

            { displayOperationId && operationId ? <span className="opblock-summary-operation-id">{operationId}</span> : null }

            {
              (!security || !security.count()) ? null :
                <AuthorizeOperationBtn
                  isAuthorized={ authSelectors.isAuthorized(security) }
                  onClick={() => {
                    const applicableDefinitions = authSelectors.definitionsForRequirements(security)
                    authActions.showDefinitions(applicableDefinitions)
                  }}
                />
            }
          </div>

          <Collapse isOpened={isShown}>
            <div className="opblock-body">
              { deprecated && <h4 className="opblock-title_normal"> Warning: Deprecated</h4>}
              { description &&
                <div className="opblock-description-wrapper">
                  <div className="opblock-description">
                    <Markdown source={ description } />
                  </div>
                </div>
              }
              {
                externalDocs && externalDocs.get("url") ?
                <div className="opblock-external-docs-wrapper">
                  <h4 className="opblock-title_normal">Find more details</h4>
                  <div className="opblock-external-docs">
                    <span className="opblock-external-docs__description">
                      <Markdown source={ externalDocs.get("description") } />
                    </span>
                    <a className="opblock-external-docs__link" href={ sanitizeUrl(externalDocs.get("url")) }>{ externalDocs.get("url") }</a>
                  </div>
                </div> : null
              }
              <Parameters
                parameters={parameters}
                operation={operation}
                onChangeKey={onChangeKey}
                onTryoutClick = { this.onTryoutClick }
                onCancelClick = { this.onCancelClick }
                tryItOutEnabled = { tryItOutEnabled }
                allowTryItOut={allowTryItOut}

                fn={fn}
                getComponent={ getComponent }
                specActions={ specActions }
                specSelectors={ specSelectors }
                pathMethod={ [path, method] }
                getConfigs={ getConfigs }
              />

              {!tryItOutEnabled || !allowTryItOut ? null : schemes && schemes.size ? <div className="opblock-schemes">
                    <Schemes schemes={ schemes }
                             path={ path }
                             method={ method }
                             specActions={ specActions }
                             currentScheme={ operationScheme } />
                  </div> : null
              }

            <div className={(!tryItOutEnabled || !response || !allowTryItOut) ? "execute-wrapper" : "btn-group"}>
              { !tryItOutEnabled || !allowTryItOut ? null :

                  <Execute
                    getComponent={getComponent}
                    operation={ operation }
                    specActions={ specActions }
                    specSelectors={ specSelectors }
                    path={ path }
                    method={ method }
                    onExecute={ this.onExecute } />
              }

              { (!tryItOutEnabled || !response || !allowTryItOut) ? null :
                  <Clear
                    onClick={ this.onClearClick }
                    specActions={ specActions }
                    path={ path }
                    method={ method }/>
              }
            </div>

            {this.state.executeInProgress ? <div className="loading-container"><div className="loading"></div></div> : null}

              { !responses ? null :
                  <Responses
                    responses={ responses }
                    request={ request }
                    tryItOutResponse={ response }
                    getComponent={ getComponent }
                    getConfigs={ getConfigs }
                    specSelectors={ specSelectors }
                    oas3Actions={oas3Actions}
                    specActions={ specActions }
                    produces={ produces }
                    producesValue={ operation.get("produces_value") }
                    pathMethod={ [path, method] }
                    displayRequestDuration={ displayRequestDuration }
                    fn={fn} />
              }
            </div>
          </Collapse>
        </div>
    )
  }

}
