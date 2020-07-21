import ReactComponent from "../ReactComponent";

export default class SearchResult extends ReactComponent {
	render() {
		const {item} = this.props;

		return (
			<div className={this.cls}>
				<div className={this.subCls('name')}>{item.first_name} {item.last_name}</div>
				<div className={this.subCls('email')}>{item.email}</div>
			</div>
		);
	}
}