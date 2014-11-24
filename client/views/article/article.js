/**
 * Created by ragnar on 23/11/14.
 */

(function(Meteor, _){

    Articles = new Meteor.Collection('articles');

    Template.article.created = function() {
        Meteor.subscribe('articles');
    };


    Template.article.helpers({
        article: function() {
            return dummyData[0];
        },

        editMode: function() {
            return (this.id == Session.get('editP'));
        }
    });

    Template.article.events({
        'dblclick p': function() {
            Session.set('editP', this.id);
        },
        'click .btn-danger': function() {
            Session.set('editP', null);
        },
        'click .btn-success': function() {
            Articles.update({});
        }
    });


    var dummyData = [
        {
            title: 'Lorem Ipsum',
            published: '23/11 - 2014, Kl: 17:01',
            paragraphs : [
                {
                    id: 0,
                    title: 'Heading 1',
                    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec at malesuada mi. Proin vel dolor metus. Phasellus dui dui, tempor et sagittis et, efficitur non odio. Proin consectetur tincidunt elit, non scelerisque augue tincidunt quis. Sed nec mauris orci. Ut sed aliquet nibh. Donec massa dolor, malesuada id magna ut, vestibulum vestibulum est.'
                },
                {
                    id: 1,
                    text: 'Vestibulum cursus mi et augue gravida, sit amet pulvinar mauris fringilla. Ut in viverra turpis, eu dignissim leo. Mauris leo erat, sodales vitae convallis id, lacinia quis libero. Nunc eu posuere orci. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin turpis ligula, aliquam a blandit at, suscipit quis orci. Nullam hendrerit dolor in urna vestibulum, a gravida libero aliquet. Phasellus sed venenatis felis. Nunc odio enim, viverra ac nisi quis, rhoncus maximus est. Morbi pellentesque tempor libero sit amet interdum. Quisque blandit sit amet eros sed rutrum. Integer imperdiet augue tristique tellus ultricies, non consequat nibh pharetra. Cras orci lectus, mattis vitae semper eu, ullamcorper nec mauris.'
                },
                {
                    id: 2,
                    title: 'Heading 2',
                    text: 'Curabitur sed libero metus. Nam hendrerit pretium lorem sodales fringilla. Proin accumsan lacus erat, quis consectetur magna commodo eu. Donec dignissim vulputate congue. Ut tempus scelerisque erat id eleifend. Integer odio nisi, vehicula ac tristique vitae, imperdiet ullamcorper nisi. Donec sit amet ex efficitur, dictum mi non, sagittis orci. Ut vitae metus in sapien suscipit aliquet. In hac habitasse platea dictumst. Fusce lacinia facilisis turpis, scelerisque accumsan tortor tincidunt eget. Suspendisse sollicitudin sodales posuere. Proin pretium risus leo, a tempus massa efficitur quis. Suspendisse eu venenatis diam. Ut aliquet consequat augue. Suspendisse malesuada eros at nisl aliquam congue. Proin aliquam arcu id felis luctus posuere.'
                }
            ]
        },
        {
            title: 'Test 2',
            paragraphs : [
                {
                    title: 'Heading 1',
                    text: 'My text, blablabla'
                },
                {
                    text: 'ølskdfjøasldkfjasøsøaldfj'
                },
                {
                    title: 'Heading 2',
                    text: 'My text, blablabla'
                }
            ]
        }
    ]

}(Meteor, _));