---
layout: page
title: Blog
permalink: /blog/
---


<style>
.blogpost_header {
	background:#eee;
	margin:20px;
	padding:8px;
	border:1px solid #555;
}
.blogpost_tags{
	font-size:0.7em;
}
.displayAll{
	display:none;
}
</style>

<div class="post">
  	<div class="container jumbotron">

		
			{% for post in site.posts %}
			<div class="blogpost_header {{post.category}} {% for tag in post.tags %}{{tag}} {% endfor %}">
				{{ post.date | date_to_string }} :: 
				<a href="javascript:displayByKey('{{ post.category }}');">{{ post.category }}</a>
				
				<br/>
				<a href="{{ post.url }}">{{post.title}}</a>
				
				<br/>
				<span class="blogpost_tags">
					{% for tag in post.tags %}
						[<a href="javascript:displayByKey('{{tag}}');">{{tag}}</a>]
					{% endfor %}
				</span>

			</div>
			{% endfor %}

		
			<p>
				<span class="displayAll"><a href="javascript:displayAll();">display all</a></span>
			</p>

	</div>
</div>

<script>
function displayAll() {
	var d = document.getElementsByClassName("blogpost_header");
	for(var i = 0; i < d.length; i++){ d[i].style.display = "block"; }
};
function hideAll() {
	var d = document.getElementsByClassName("blogpost_header");
	for(var i = 0; i < d.length; i++){ d[i].style.display = "none"; }
	document.getElementsByClassName("displayAll")[0].style.display = "nonei";
};
function displayByKey(keyword) {
	hideAll();
	d = document.getElementsByClassName("blogpost_header "+keyword);
	for(var i = 0; i < d.length; i++){ d[i].style.display = "block"; }
	document.getElementsByClassName("displayAll")[0].style.display = "block";
};

</script>
