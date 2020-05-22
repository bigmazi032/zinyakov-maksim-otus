<style>
	.container {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		justify-content: space-between;
	}
</style>

<script>
	import InputForm from "./components/InputForm.svelte"
	import Grid from "./components/Grid.svelte"
	import FusionCharts from 'fusioncharts';
	import Charts from 'fusioncharts/fusioncharts.charts';
	import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
	import SvelteFC, { fcRoot } from 'svelte-fusioncharts';

	// Always set FusionCharts as the first parameter
	fcRoot(FusionCharts, Charts, FusionTheme);

	const columns = [
		{name: '#', key: 'id', type: 'number'},
		{name: 'Дата', key: 'date', type: 'date'},
		{name: 'Категория', key: 'category', type: 'string' },
		{name: 'Стоимость', key: 'value', type: 'currency'}
	];

	let initialData = [
		{id: '1', date: '01.01.2020', category: 'home', value: 200},
		{id: '2', date: '04.02.2020', category: 'health', value: 350},
		{id: '3', date: '01.04.2020', category: 'food', value: 100},
		{id: '4', date: '06.03.2020', category: 'entertainment', value: 10},
		{id: '5', date: '01.01.2020', category: 'home', value: 343},
		{id: '6', date: '04.02.2020', category: 'health', value: 123},
		{id: '7', date: '01.04.2020', category: 'auto', value: 432},
		{id: '8', date: '06.03.2020', category: 'entertainment', value: 123},
		{id: '9', date: '01.04.2020', category: 'home', value: 644},
		{id: '10', date: '04.05.2020', category: 'food', value: 456},
		{id: '11', date: '01.06.2020', category: 'home', value: 45},
		{id: '12', date: '06.01.2020', category: 'auto', value: 87},
		{id: '1', date: '01.02.2020', category: 'auto', value: 89},
		{id: '2', date: '04.03.2020', category: 'health', value: 78},
		{id: '3', date: '01.05.2020', category: 'home', value: 33},
		{id: '4', date: '06.02.2020', category: 'entertainment', value: 789},
		{id: '5', date: '01.03.2020', category: 'home', value: 78},
		{id: '6', date: '04.04.2020', category: 'health', value: 321},
		{id: '7', date: '01.04.2020', category: 'home', value: 456},
		{id: '8', date: '06.02.2020', category: 'entertainment', value: 15},
		{id: '9', date: '01.02.2020', category: 'home', value: 789},
		{id: '10', date: '04.02.2020', category: 'auto', value: 78},
		{id: '11', date: '01.04.2020', category: 'home', value: 65},
		{id: '12', date: '06.03.2020', category: 'auto', value: 753},
		{id: '1', date: '01.04.2020', category: 'food', value: 159},
		{id: '2', date: '04.03.2020', category: 'health', value: 75},
		{id: '3', date: '01.04.2020', category: 'home', value: 456},
		{id: '4', date: '06.01.2020', category: 'food', value: 65},
		{id: '5', date: '01.01.2020', category: 'home', value: 200},
		{id: '6', date: '04.01.2020', category: 'health', value: 500},
		{id: '7', date: '01.04.2020', category: 'home', value: 78},
		{id: '8', date: '06.01.2020', category: 'entertainment', value: 53},
		{id: '9', date: '01.01.2020', category: 'food', value: 123},
		{id: '10', date: '04.01.2020', category: 'health', value: 312},
		{id: '11', date: '01.04.2020', category: 'auto', value: 98},
		{id: '12', date: '06.01.2020', category: 'entertainment', value: 876},
		{id: '1', date: '01.03.2020', category: 'home', value: 56},
		{id: '2', date: '04.03.2020', category: 'auto', value: 38},
		{id: '3', date: '01.04.2020', category: 'food', value: 92},
		{id: '4', date: '06.01.2020', category: 'entertainment', value: 93},
		{id: '5', date: '01.04.2020', category: 'home', value: 74},
		{id: '6', date: '04.04.2020', category: 'health', value: 765},
		{id: '7', date: '01.04.2020', category: 'home', value: 45},
		{id: '8', date: '06.01.2020', category: 'food', value: 111},
		{id: '9', date: '01.01.2020', category: 'home', value: 200},
		{id: '10', date: '04.01.2020', category: 'health', value: 500},
		{id: '11', date: '01.04.2020', category: 'home', value: 100},
		{id: '12', date: '06.01.2020', category: 'food', value: 300},
	];

	let dataAfterSearch = initialData;

	let chartInfo = {
		caption: 'Затраты по категориям',
		subCaption: '',
		xAxisName: 'Затраты',
		yAxisName: 'Категории',
		numberSuffix: '',
		theme: 'fusion'
	};

	$: chartConfigs = updateChartConfig(updateDataSource(chartInfo, prepareDataForChat(dataAfterSearch)));

	function updateChartConfig(dataSource) {
		return {
			type: 'doughnut2d',
			width: 600,
			height: 400,
			dataFormat: 'json',
			dataSource: dataSource
		}
	}

	function updateDataSource(chart, data){
		return {
			chart,
			data
		}
	}

	function updateChartInfo(update) {
		chartInfo[update.key] = update.value
	}

	function prepareDataForChat(data) {
		console.log("prepareDataForChat "+ JSON.stringify(data))
		let dataForChat = [];
		if (data && data.length) {
			data.forEach(row => {
				let presentElement = dataForChat.filter(el=> el.label === row.category);
				if (presentElement.length) {
					presentElement[0].value += +row.value;
				} else {
					dataForChat.push({
						label: row.category,
						value: row.value
					})
				}
			})
		}
		return dataForChat;
	}

	function onDataUpdated(event) {
		dataAfterSearch = event.detail.data;
		console.log("dATA UPD" + dataAfterSearch.length)
		let caption = event.detail.searchKey ? `C учтетом поиска "${event.detail.searchKey}"` : '';
		updateChartInfo({key: "subCaption", value: caption});
	}

	function onClickBtnAddCost (event) {
			if (event.detail && event.detail.row) {
				addRow(event.detail.row)
			}
	}

	function addRow(row) {
		let lastId = initialData[initialData.length-1].id;
		row.id = ++lastId;
		initialData = [...initialData, row]
	}
</script>


<div>
    <h1>Моя домашняя бухгалтерия</h1>
    <InputForm on:clickBtnAddCost={onClickBtnAddCost}></InputForm>
	<div class="container">
		<Grid
				pData={initialData}
				pColumns={columns}
				on:dataUpdated={onDataUpdated}></Grid>
		<SvelteFC {...chartConfigs} />
	</div>

</div>
