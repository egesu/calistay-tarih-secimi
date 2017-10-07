$(() => {
    function handleSelectClick(element) {
        let name = $('#name').val();

        if (!name) {
            alert('Önce isminizi ve konunuzu girmelisiniz.');
            $('#name').focus();
            return false;
        }

        let date = $(element).parents('tr').find('td:eq(0)').text();
        let time = $(element).parents('tr').find('td:eq(1)').text();

        if (!confirm(date + ' ' + time + ' tarih-saatini seçmek istediğinizden emin misiniz?')) {
            return;
        }

        $.ajax({
            method: 'POST',
            url: 'app.php',
            data: {
                selectedId: $(element).attr('id').split('-')[1],
                name: name,
            },
        }).done((response) => {
            alert('Kaydedildi.');
            location.reload();
        }).fail(() => {
            console.error('fail');
        });
    }

    function loadItems() {
        $.ajax({
            method: 'GET',
            dataType: 'json',
            url: 'app.php',
        }).done((response) => {
            let id;

            for (let index in response) {
                id = index.split('-')[1];
                $('#available-' + id).parents('td').text(response[index]);
            }
        }).fail((error) => {
            alert('Mevcut konuşmalar yüklenemedi. Boş gözüken alanlar dolu olabilir :-(');
            console.error(error);
        });
    }

    $('[id|="available"]').each(function(index, element) {
        $(element).click(function() {
            handleSelectClick(element);
        });
    });

    loadItems();
});
