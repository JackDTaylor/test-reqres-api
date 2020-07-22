import ReactComponent from "./ReactComponent";
import SearchForm from "./Components/SearchForm";
import SearchResultList from "./Components/SearchResultList";
import {bound} from "../common/Utils/decorators";
import QueryString from "querystring";

export default class Application extends ReactComponent {
	state = {
		isLoading: false,
		items: null,
	};

	async fetchUsers(query) {
		return await fetch(`/api/user/search?${QueryString.encode(query)}`)
			.then(x => x.json())
			.then(x => x.items);
	}

	async search(searchTerm) {
		if(this.state.isLoading) {
			return;
		}

		const deferredState = {};

		this.setState({
			error: false,
			isLoading: true
		});

		try {
			deferredState.items = await this.fetchUsers({ searchTerm });
		} catch(error) {
			deferredState.error = error;
		} finally {
			deferredState.isLoading = false;
		}

		console.log(deferredState);
		this.setState(deferredState);
	}

	@bound onSearch(searchTerm) {
		return this.search(searchTerm);
	}

	render() {
		return (
			<div className={this.cls}>
				<SearchForm onSearch={this.onSearch} isLoading={this.state.isLoading} />
				<SearchResultList items={this.state.items} />
			</div>
		);
	}
}