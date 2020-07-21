import ReactComponent from "../ReactComponent";
import {bound} from "../../common/Utils/decorators";

export default class SearchForm extends ReactComponent {
	state = {
		searchTerm: '',
	};

	formRef;

	get searchTerm() {
		return this.state.searchTerm;
	}

	@bound onInputChange(event) {
		this.setState({searchTerm: event.target.value});
	}

	@bound onSubmit(event) {
		if(this.formRef.reportValidity() === false) {
			return;
		}

		event.preventDefault();

		if(!this.props.onSearch) {
			return;
		}

		console.log(this.state.searchTerm);
		this.props.onSearch(this.searchTerm);
	}

	get inputProps() {
		return {
			name: 'query',
			type: 'text',
			required: true,
			autoComplete: 'off',

			value: this.searchTerm,
			onChange: this.onInputChange,
		}
	}

	render() {
		const {isLoading} = this.props;

		return (
			<form className={this.cls} ref={el => this.formRef = el} onSubmit={this.onSubmit}>
				<input className={this.subCls('input')} {...this.inputProps} />

				<button className={this.subCls('button', {isLoading})}>Искать</button>
			</form>
		);
	}
}