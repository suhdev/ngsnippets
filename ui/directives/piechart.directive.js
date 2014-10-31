angular.module('Ui')
	.directive('pieChart', [function () {
		return {
			templateUrl:'/templates/ui/piechart.template.html',
			controller:['$scope','$timeout',function($S,$T){
				//this.chart = null;
				this.margins = {
					left:60,
					top:40,
					right:20,
					bottom:40
				};
			}],
			scope:{
				model:'=model',
				innerData:'=innerData'
			},
			controllerAs:'pieChartCtrl',
			restrict: 'A',
			link: function ($S, $E, $A, $C) {
				jQuery(window).resize(function(){
					var width = $E.width();
				$C.pie = d3.layout.pie()
					.value(function(d){
						return d.value;
					});
				$C.arc = d3.svg.arc()
					.outerRadius(width/2.2)
					.innerRadius(width/4.7);


				$C.color = d3.scale.category20c();
				var temp = $E.get(0);
				if ($E.find('svg').length > 0){
					$E.empty();
				}

				$C.chart = d3.select($E.get(0))
					.append('svg')
						.attr('height',width)
						.attr('width',width)
						.data([$S.model])
					.append('g')
						.attr('transform','translate('+width/2+","+width/2+")");
				$C.group = $C.chart
					.selectAll('g.slice')
					.data($C.pie);
				$C.group.enter()
						.append('g')
							.attr('class','slice')
							.append('path')
								.attr('d',$C.arc)
								.on('mouseenter',function(d,a,b){
									d3.select(this)
										.transition()
										.attr('transform','scale(1.05)')
										.attr('stroke','#45A');
								})
								.on('mouseleave',function(d,a,b){
									d3.select(this)
										.transition()
										.attr('transform','scale(1)')
										.attr('stroke',$C.color(a));
								})
								.attr('fill',function(d,i){
									return $C.color(i);
								});




				$C.group.exit()
						.transition()
						.attr('transform','scale(0.1)')
						.remove();
				});
			jQuery(window).trigger('resize');
				
			}
		};
	}])