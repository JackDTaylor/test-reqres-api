import ReactComponent from "../ReactComponent";
import SearchResult from "./SearchResult";
import {empty} from "../../common/Utils/functions";

export default class SearchResultList extends ReactComponent {
	get items() {
		return this.props.items || [];
	}

	renderItems() {
		if(empty(this.items)) {
			return <div className={this.subCls('message')}>Ничего не найдено</div>
		}

		return this.items.map(item => (
			<SearchResult key={item.id} item={item} />
		));
	}

	render() {
		return (
			<div className={this.cls}>
				{this.renderItems()}
			</div>
		);
	}
}