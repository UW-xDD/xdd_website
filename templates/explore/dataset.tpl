<div class="content panel">
	<div class="info">
		<h1><%= name %></h1>
		<h3>
			<p class='count'>
				<span class="total-docs"><%= data.total.toLocaleString() %></span>
				<span class='count-label'>documents</span>
			</p>
			<p class='count-sub'>
				<span class="monthly-docs"><%= data.lastMonth.toLocaleString() %></span>
				added this month
			</p>
			<p class='count-sub'>
				<span class="weekly-docs"><%= data.lastWeek.toLocaleString() %></span>
				added this week
			</p>
			<p class='count-sub'>
				<span class="daily-docs"><%= data.lastDay.toLocaleString() %></span>
				added in the last 24 hours
			</p>
		</h3>
		<button class="btn btn-large">
			<i class="fa fa-search"></i>Search
		</button>
	</div>
</div>

<p class="description"><%= description %></p>

<div class="details collapsible collapse">
	<label>Details</label>
	<p></p>
</div>

<div class="links collapsible collapse">
	<label>Links</label>
	<ol></ol>
</div>

<div class="buttons">
	<button class="details-expander btn btn-sm" style="display:none"><i class="fa fa-list-ul"></i></button>
	<button class="links-expander btn btn-sm" style="display:none"><i class="fa fa-link"></i></button>
</div>