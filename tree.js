var Diagram = MindFusion.Diagramming.Diagram;
var Behavior = MindFusion.Diagramming.Behavior;
var AbstractionLayer = MindFusion.AbstractionLayer;
var Alignment = MindFusion.Diagramming.Alignment;
var AnchorPattern = MindFusion.Diagramming.AnchorPattern;
var Shape = MindFusion.Diagramming.SimpleShape;
var Font = MindFusion.Drawing.Font;
var Rect = MindFusion.Drawing.Rect;
var Text = MindFusion.Drawing.Text;
var Thickness = MindFusion.Drawing.Thickness;
var Event = MindFusion.Diagramming.Events;
var GlassEffect = MindFusion.Diagramming.GlassEffect;
var Style = MindFusion.Diagramming.Style;
var SimpleShape = MindFusion.Diagramming.SimpleShape;
var ImageAlign = MindFusion.Diagramming.ImageAlign;
var LinkShape = MindFusion.Diagramming.LinkShape;
var id = 0;

var OrgChartNode = function (parent, root)
{
	AbstractionLayer.initializeBase(OrgChartNode, this, [parent]);
	this.childNodes = [];
	this.redimTable(3, 4);
	this.getCell(1, 3).setColumnSpan(2);
	this.getCell(0, 0).setRowSpan(4);
	this.getCell(1, 1).setText("Relation:");
	this.getCell(1, 1).setFont(
            new Font("Verdana", 3.5, true /*bold*/, false /*italic*/));
	this.getCell(1, 2).setFont(
            new Font("Verdana", 3.5, true /*bold*/, false /*italic*/));
	this.getCell(2, 2).setFont(
            new Font("Verdana", 3.5, false /*bold*/, false /*italic*/));
	this.getCell(1, 0).setFont(
            new Font("Verdana", 3.5, true /*bold*/, false /*italic*/));
	this.getCell(1, 3).setFont(
            new Font("Verdana", 3, false /*bold*/, false /*italic*/));
	this.configureCells();

	this.setCaptionHeight(0);
	this.setHandlesStyle(MindFusion.Diagramming.HandlesStyle.MoveOnly);
	this.setCellFrameStyle(MindFusion.Diagramming.CellFrameStyle.None);
	this.setBrush("blue");
	this.setShape(SimpleShape.Rectangle);

	this.setFullName("Name");
	this.setRelation("Relation");
	this.setTimeLine("0000-0000");
	this.setImageLocation("http://www.pi-cube.com/wp-content/uploads/2015/04/team-placeholder.jpg");
	this.setId();
	this.setRoot(root);
	this.setHierarchy();

	this.resize();
	this.setAnchorPattern(AnchorPattern.fromId("TopInBottomOut"));
}
OrgChartNode.prototype =
{
	updateCanvasElements: function (node)
	{
		this.setFields();
		AbstractionLayer.callBaseMethod(OrgChartNode, this, 'updateCanvasElements');
	},

	getRelation: function ()
	{
		return this.Relation;
	},

	setRelation: function (value)
	{
		if (this.Relation !== value)
		{
			this.Relation = value;
			this.invalidate();
		}
	},

	getTimeLine: function ()
	{
		return this.TimeLine;
	},

	setTimeLine: function (value)
	{
		if (this.TimeLine !== value)
		{
			this.TimeLine = value;
			this.invalidate();
		}
	},

	getFullName: function ()
	{
		return this.fullName;
	},
	setFullName: function (value)
	{
		if (this.fullName !== value)
		{
			this.fullName = value;
			this.invalidate();
		}
	},
	getImageLocation: function ()
	{
		return this.nodeImageLocation;
	},
	setImageLocation: function (value)
	{
		if (this.nodeImageLocation != value)
		{ 
			var alignment = MindFusion.Diagramming.ImageAlign;
			this.nodeImageLocation = value;
			this.getCell(0,0).setImageLocation(value);
			this.getCell(0,0).setImageAlign(alignment.Stretch);
			this.invalidate();
		}
	},
	getAddress: function ()
	{
		return this.Address;
	},

	setAddress: function (value)
	{
		if (this.Address !== value)
		{
			this.Address = value;
			this.invalidate();
		}
	},
	setId: function ()
	{
		this.id = id;
		id++;
	},
	getId: function()
	{
		return this.id;
	},
	setFields: function()
	{
		this.setCaptionHeight(0);
		this.getCell(1,0).setText("Name:")
		this.getCell(2,0).setText(this.fullName);
		this.getCell(1,3).setText(this.Address);
		this.getCell(1,3).text.padding = new Thickness(0,0,0,0);
		this.getCell(2,1).setText(this.Relation);
		this.getCell(1,2).setText("TimeLine:");
		this.getCell(2,2).setText(this.TimeLine);
		this.getCell(0,0).setImagePadding(new Thickness(2,2,2,2));
		this.getCell(0,0).setImageLocation(this.ImageLocation);
		this.getCell(0, 0).setImageAlign(ImageAlign.Fit);
		this.setHierarchy();
		this.setColor();
	},
	resize: function()
	{
		var oldHeight = this.bounds.height;
		var oldImageWidth = this.getColumn(0).width;
		this.resizeToFitText(true,true);
		var newHeight = this.bounds.height - oldHeight;
		this.getCell(0, 0).imagePadding.top += newHeight/2;
		this.getCell(0, 0).imagePadding.bottom += newHeight / 2;
		this.getColumn(0).width = oldImageWidth;
		this.bounds.width += oldImageWidth;

	},
    configureCells: function()
	{
		for(var i = 0;i<3;i++)
		{
			for(var j = 0;j<3;j++){
				this.getCell(i,j).editable = false;
			}
		}

		for(var i=0;i<4;i++){
			this.getCell(2,i).text.padding.left = 0;
			this.getCell(2,i).text.padding.right = 1;
		}

		this.getCell(0,0).editable = true;
		this.getCell(1,3).editable = true;
		this.getCell(2,0).editable = true;
		this.getCell(2,2).editable = true;
		this.getCell(2,1).editable = true;
	},
	setRoot: function(root)
	{
		if (root != this.root)
		{
			this.root = root;
			this.setHierarchy();
			this.invalidate();
		}
	},
	setHierarchy: function ()
	{
		if (this.root == undefined)
		{
			this.hierarchy = 0;
		}
		else
		{
			if (this.root.hierarchy == undefined)
			{
				this.hierarchy = 1;
			}
			else
			{
				this.hierarchy = this.root.hierarchy + 1;
				this.root.addChild(this);
			}
		}
		for (var i = 0; i < this.childNodes; i++)
			this.childNodes[i].setHierarchy();

		this.setColor();
	},
	setColor: function()
	{
		var hierarchyLevel = this.hierarchy;
		switch (hierarchyLevel)
		{
		case 0:
			this.setBrush("#C4A484");
			break;
		default:
			this.setBrush("#90EE90");
			break;
		}
	},
	addChild: function(child)
	{
		var isHere = false;
		for (var i=0 ; i<this.childNodes.length;i++)
		{
			if(this.childNodes[i].id == child.id)
				isHere = true;
		}
		if (!isHere)
			this.childNodes.push(child);
	},
	removeChild: function(child)
	{
		var index = this.childNodes.indexOf(child);
		if(index > -1)
			this.childNodes.splice(index,1);
	},
	resetHierarchy: function()
	{
		this.setHierarchy();
		for (var i=0 ; i<this.childNodes.length;i++)
		{
			this.childNodes[i].setRoot(this);
			this.childNodes[i].resetHierarchy();
		}
	},
	isChild: function(child)
	{
		for (var i=0;i<this.childNodes.length; i++)
		{
			if (child === this.childNodes[i])
				return true;
		}
		return false;
	}
};

var diagram = null;
var tree = null;

$(document).ready(function ()
{
	AbstractionLayer.registerClass(OrgChartNode, "OrgChartNode", MindFusion.Diagramming.TableNode);

	tree = new MindFusion.Graphs.TreeLayout();
	tree.direction = MindFusion.Graphs.LayoutDirection.TopToBottom;
	tree.linkType = MindFusion.Graphs.TreeLayoutLinkType.Cascading;

	$("#diagram")[0].oncontextmenu = function () { return false; }
	diagram = Diagram.create($("#diagram")[0]);
	diagram.setBehavior(Behavior.Custom);
	diagram.setShowGrid(false);
	diagram.setAllowSelfLoops(false);
	diagram.setAutoScroll(true);
	diagram.setLinkShape(LinkShape.Cascading);
	diagram.setBackBrush('#FFFAFA');

	diagram.addEventListener(Event.clicked, function (diagram, eventArgs)
	{
		var button = eventArgs.getMouseButton();
		var position = eventArgs.getMousePosition();

		if (button === 2)
		{
			var node = new OrgChartNode(diagram, undefined);
			node.setBounds(new Rect(position.x, position.y, 20, 20));
			node.resize();
			diagram.addItem(node);
			diagram.arrangeAnimated(tree);
		}
	});
	diagram.addEventListener(Event.animatedLayoutCompleted, function (diagram, eventArgs)
	{
		diagram.resizeToFitItems();
	});

	diagram.addEventListener(Event.nodeClicked, onNodeClicked);

	diagram.addEventListener(Event.nodeSelected, function (diagram, eventArgs)
	{
		eventArgs.getNode().setZIndex(700);
	});

	diagram.addEventListener(Event.nodeDeselected, function (diagram, eventArgs)
	{
		eventArgs.getNode().setZIndex(0);
	});
	diagram.addEventListener(Event.linkCreated, onLinkCreated);
	diagram.addEventListener(Event.cellTextEdited, function (diagram, cellArgs)
	{
		cellArgs.getCell().onEdited(diagram, cellArgs);
	});
	diagram.addEventListener(Event.linkCreated, function (diagram, eventArgs)
	{
		diagram.arrangeAnimated(tree);
	});
	diagram.addEventListener(Event.nodeDeleted, function (diagram, eventArgs)
	{
		diagram.arrangeAnimated(tree);
	})
	diagram.addEventListener(Event.linkDeleted, function (diagram, eventArgs)
	{
		var destNode = eventArgs.getLink().destination;

		destNode.root.removeChild(destNode);

		destNode.root = undefined;

		destNode.resetHierarchy();
		destNode.getCell(2, 2).setText("");
		diagram.arrangeAnimated(tree);
	});

	diagram.addEventListener(Event.nodeModified, function (diagram, eventArgs)
	{
		if (!(eventArgs.getNode().root))
		{
			var mousePoint = eventArgs.getMousePosition();
			var nodes = diagram.getNodesAt(mousePoint);

			for (var i = 0; i < nodes.length; i++)
			{
				if (nodes[i] !== eventArgs.getNode() && !eventArgs.getNode().isChild(nodes[i]))
				{
					eventArgs.getNode().setRoot(nodes[i]);

					var l = diagram.getFactory().createDiagramLink(nodes[i], eventArgs.getNode());

					styleLink(l);

					eventArgs.getNode().resetHierarchy();

					diagram.arrangeAnimated(tree);

					diagram.resizeToFitItems();
					break;
				}
			}
		}
	})

	diagram.addEventListener(Event.enterInplaceEditMode, function (diagram, eventArgs)
	{
		var cell = eventArgs.getItem().getCellKind();
		switch (cell)
		{
			case 0:
				eventArgs.getControl().setAttribute("placeholder", "Image URL:");
				break;

			case 1:
				eventArgs.getControl().setAttribute("placeholder", "Name:");
				break;

			case 2:
				eventArgs.getControl().setAttribute("placeholder", "Relation:");
				break;
			case 3:
				eventArgs.getControl().setAttribute("placeholder", "Address:");
				break;

			default:
				eventArgs.getControl().setAttribute("placeholder", "TimeLine:");
				break;

		}
	});
	var NodeA = new OrgChartNode(diagram);
	NodeA.setBounds(new Rect(25, 15, 60, 25));
	NodeA.setRelation("Relation");
	NodeA.setFullName("Name");
	NodeA.setTimeLine("0000-0000");
	NodeA.setImageLocation("Input Image");
	NodeA.resize();
	diagram.addItem(NodeA);

	diagram.arrangeAnimated(tree);
	diagram.setAllowInplaceEdit(false);
	diagram.setBehavior(Behavior.Modify);
});

function editNode(diagram, eventArgs)
{
	var cellEditor = eventArgs.getNode().cellFromPoint(eventArgs.getMousePosition());

	var tableNode = eventArgs.getNode();
	var edit = false;
	if (cellEditor.cell != undefined)
		if(cellEditor.cell.editable == true)
			edit = true;
	if (edit==true)
	{
		diagram.beginEdit(eventArgs.getNode(),eventArgs.getMousePosition());
		$("diagram_inplaceInput").attr("placeholder", "url");
		cellEditor.cell.onEdited = function (diagram, tableCell)
		{
			if (edit)
			{
				if (cellEditor.cell.image)
				{
					if (tableCell.getNewText() != undefined &&
						tableCell.getNewText() != "" &&
						tableCell.getNewText != "undefined")
					{
						tableNode.setImageLocation(tableCell.getNewText());
						cellEditor.cell.text.height = 0;
						cellEditor.cell.text.text = "";
					}
				}
				else if (cellEditor.row < 3)
				{
					var oldImageWidth = tableNode.getColumn(0).width;
					tableNode.resizeToFitText(true,true);
					tableNode.getColumn(0).width = oldImageWidth;
					tableNode.bounds.width += oldImageWidth;					
				}

				else if (cellEditor.row === 3)
				{
					var oldHeight = tableNode.bounds.height;
					var oldImageWidth = tableNode.getColumn(0).width;
					tableNode.resizeToFitText(true,true);
					var newHeight = tableNode.bounds.height - oldHeight;
					tableNode.getCell(0, 0).imagePadding.top += newHeight / 2;
					tableNode.getCell(0, 0).imagePadding.bottom += newHeight / 2;
					tableNode.getColumn(0).width = oldImageWidth;
					tableNode.bounds.width += oldImageWidth;
				}
				
	if (cellEditor.row == 0 && cellEditor.column == 2)
                 tableNode.fullName = tableCell.newText;
                if (cellEditor.row == 1 && cellEditor.column == 2)
                 tableNode.Relation = tableCell.newText;
	if (cellEditor.row == 2 && cellEditor.column == 2)
                 tableNode.TimLine = tableCell.newText;
	if (cellEditor.row == 3 && cellEditor.column == 1)
                 tableNode.Address = tableCell.newText;

			 
				diagram.arrangeAnimated(tree);
			}
		}

		tableNode.getCellKind = function()
		{
			if (cellEditor.cell.image){
				return 0;
			}else if (cellEditor.row == 0){
				return 1;
			}else if (cellEditor.row == 1){
				return 2;
			}else if (cellEditor.row == 3){
				return 3;
			}else {return 4;}
		}
	}
}
function onLinkCreated(diagram, eventArgs)
{
	if (eventArgs.getLink().permission === true)
		styleLink(eventArgs.getLink());
}
function styleLink(link)
{
	link.setPen("#2d3956");
	link.setStrokeThickness(2.0);
	link.setHeadShape();
}
function createNode(diagram, eventArgs)
{
	var parent = eventArgs.getNode();
	var node = new OrgChartNode(diagram, parent);
	node.setBounds(parent.getBounds());

	diagram.addItem(node);
	node.resize();
	var link = diagram.getFactory().createDiagramLink(eventArgs.getNode(),node);
	link.permission = true;
	styleLink(link);
	diagram.arrangeAnimated(tree);
	diagram.resizeToFitItems();
}
function onNodeClicked(diagram, eventArgs)
{
	var button = eventArgs.getMouseButton();
	if (button === 0)
		editNode(diagram, eventArgs);
	else if (button === 2)
		createNode(diagram, eventArgs);
}