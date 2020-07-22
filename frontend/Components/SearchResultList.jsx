import ReactComponent from "../ReactComponent";
import SearchResult from "./SearchResult";
import {empty} from "../../common/Utils/functions";

export default class SearchResultList extends ReactComponent {
	get items() {
		return this.props.items;
	}

	renderMessage(message) {
		return <div className={this.subCls('message')}>{message}</div>
	}

	renderItems() {
		if(this.items === null) {
			return this.renderMessage('Начните искать, используя поле выше');
		}

		if(empty(this.items)) {
			return this.renderMessage('Ничего не найдено');
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